'use client'
import { useRef, useState, useEffect } from 'react'

export default function Simulation() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isRecording, setIsRecording] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const [transcript, setTranscript] = useState<string>('')
    const recognitionRef = useRef<any>(null)
    const [responses, setResponses] = useState<Array<{ 
        text: string, 
        startTime: number, 
        endTime: number,
        fullTranscript: string 
    }>>([])
    const currentResponseStartRef = useRef<number | null>(null)
    const currentFullTranscriptRef = useRef<string>('')

    // Guard so that we only process a finish once per response
    const isProcessingResponseRef = useRef(false);

    // Conversation state holds the chat history
    const [conversation, setConversation] = useState<Array<{ role: string, content: string }>>([]);

    // Add loading state
    const [isLoading, setIsLoading] = useState(false);

    // --- NEW: a ref to always have the latest recording status
    const isRecordingRef = useRef(isRecording);
    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);

    // Start interview calls the API to get the AI's first question.
    async function startInterview() {
        if (isLoading) return; // Prevent multiple calls
        setIsLoading(true);
        
        const resume = localStorage.getItem('resume');
        const payload = {
            messages: [],
            context: {
                jobDescription: "N/A",
                resumeContext: resume || "Placeholder résumé context",
                requiredSkills: "N/A",
                chatContext: "N/A"
            }
        };

        try {
            const res = await fetch('/api/interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error('Network error');
            }
            const data = await res.json();
            setConversation([{ role: 'assistant', content: data.nextQuestion }]);
        } catch (error) {
            console.error('Error starting interview:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Posts the conversation (including candidate answer) to the API for the next AI question.
    async function fetchNextQuestion(updatedMessages: Array<{ role: string, content: string }>) {
        if (isLoading) return;
        setIsLoading(true);

        const payload = {
            messages: updatedMessages,
            context: {
                jobDescription: "Placeholder job description",
                resumeContext: "Placeholder résumé context",
                requiredSkills: "Placeholder required skills",
                chatContext: "N/A"
            }
        };

        try {
            const res = await fetch('/api/interview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error('Network error');
            }
            const data = await res.json();
            
            // Save evaluation if it exists
            if (data.evaluation) {
                const evaluations = JSON.parse(localStorage.getItem('interview_evaluations') || '[]');
                evaluations.push({
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    evaluation: data.evaluation,
                    response: updatedMessages[updatedMessages.length - 1].content
                });
                localStorage.setItem('interview_evaluations', JSON.stringify(evaluations));
            }

            setConversation(prev => [...prev, { role: 'assistant', content: data.nextQuestion }]);
        } catch (error) {
            console.error('Error fetching next question:', error);
        } finally {
            setIsLoading(false);
            isProcessingResponseRef.current = false;
        }
    }

    // Called when a candidate response is finalized.
    function handleUserResponse(responseText: string) {
        // First update the conversation with the user's response
        setConversation(prev => {
            const updated = [...prev, { role: 'user', content: responseText }];
            // Then fetch the next question with the complete conversation history
            fetchNextQuestion(updated);
            return updated;
        });
    }

    // Combine interview session start with video recording start in a single button.
    const handleStartStop = async () => {
        if (isRecording) {
            stopRecording();
        } else {
            // If the conversation is empty, start the interview (i.e. fetch the first AI question)
            if (conversation.length === 0) {
                await startInterview();
            }
            await startRecording();
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            // --- NEW: Automatically restart recognition when it ends if recording is active.
            recognitionRef.current.onend = () => {
                if (isRecordingRef.current) {
                    try {
                        recognitionRef.current.start();
                    } catch (error) {
                        console.error("Failed to restart speech recognition in onend", error);
                    }
                }
            };

            recognitionRef.current.onresult = (event: any) => {
                let interimTranscript = '';
                let newText = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const recognizedText = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        newText += ' ' + recognizedText;

                        if (currentResponseStartRef.current === null) {
                            currentResponseStartRef.current = Date.now();
                            currentFullTranscriptRef.current = '';
                        }
                        currentFullTranscriptRef.current += ' ' + recognizedText;

                        // Check if the trigger phrase is spoken
                        if (recognizedText.toLowerCase().includes('finish response')) {
                            // Use a ref flag to ensure this finish is only processed once.
                            if (isProcessingResponseRef.current) return;
                            isProcessingResponseRef.current = true;

                            // --- REMOVED: We no longer stop recognition here so that the microphone stays on.
                            // recognitionRef.current?.stop();
                            
                            console.log('Response finished');
                            const endTime = Date.now();
                            if (currentResponseStartRef.current !== null) {
                                const cleanTranscript = currentFullTranscriptRef.current
                                    .replace(/finish response/i, '')
                                    .replace(/  +/g, ' ')
                                    .trim();
                                
                                setResponses(prev => [
                                    ...prev, 
                                    {
                                        text: cleanTranscript,
                                        startTime: currentResponseStartRef.current!,
                                        endTime: endTime,
                                        fullTranscript: currentFullTranscriptRef.current.trim()
                                    }
                                ]);
                                currentResponseStartRef.current = null;
                                currentFullTranscriptRef.current = '';
                                setTranscript('');
                                handleUserResponse(cleanTranscript);
                                return;
                            }
                        }
                    } else {
                        interimTranscript += recognizedText;
                    }
                }
                
                // Update the transcript based on whether we got any final recognized text
                setTranscript(newText || interimTranscript);
            };
        }
    }, []); // Initialize recognition only on mount

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            
            mediaRecorder.start();
            // Start SpeechRecognition only if it's available.
            recognitionRef.current?.start();
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
            tracks?.forEach(track => track.stop());
            setIsRecording(false);
            recognitionRef.current?.stop();
        }
    }

    return (
        <div className="min-h-screen bg-[#FEF5F2] p-4">
            <div className="grid grid-cols-3 gap-4">
                {/* Video Panel */}
                <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-lg p-4 shadow-lg">
                    <h1 className="text-lg font-bold mb-2">Interview Simulation</h1>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        className="w-full aspect-video bg-gray-100 rounded-lg border-2 border-[#5B524F] mb-2"
                    />
                    <button
                        onClick={handleStartStop}
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-[#FF4F01] text-white rounded-full font-semibold 
                            hover:bg-black transition-all duration-200 
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : isRecording ? 'Stop Interview' : 'Start Interview'}
                    </button>
                </div>

                {/* Transcript Panel */}
                <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-lg p-4 shadow-lg">
                    <h2 className="text-lg font-bold mb-2">Transcript</h2>
                    <div className="h-[calc(100%-3rem)] overflow-y-auto bg-white p-3 rounded-lg border-2 border-[#5B524F]">
                        {transcript || 'Your speech will appear here...'}
                    </div>
                </div>

                {/* Responses Panel */}
                <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-lg p-4 shadow-lg">
                    <h2 className="text-lg font-bold mb-2">Recorded Responses</h2>
                    <div className="h-[calc(100%-3rem)] overflow-y-auto space-y-2">
                        {responses.length === 0 ? (
                            <div className="bg-white p-3 rounded-lg border-2 border-[#5B524F] text-sm">
                                No responses recorded yet. Say "finish response" to save a response.
                            </div>
                        ) : (
                            responses.map((response, index) => (
                                <div key={index} className="bg-white p-3 rounded-lg border-2 border-[#5B524F] text-sm">
                                    <div className="text-gray-600">
                                        {`${formatTime(response.startTime - responses[0].startTime)} to ${formatTime(response.endTime - responses[0].startTime)}`}
                                    </div>
                                    <div className="mt-1 font-semibold">Response:</div>
                                    <div className="mt-0.5">{response.text}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Interview Conversation Panel */}
            <div className="mt-4">
                <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-lg p-4 shadow-lg">
                    <h2 className="text-lg font-bold mb-2">Interview Conversation</h2>
                    <div className="max-h-[200px] overflow-y-auto">
                        {conversation.length === 0 ? (
                            <p className="text-gray-600 text-sm">The conversation will appear here once you start your interview.</p>
                        ) : (
                            conversation.map((msg, index) => (
                                <div key={index} className={`mb-1 text-sm ${msg.role === 'assistant' ? 'text-blue-700' : 'text-green-700'}`}>
                                    <strong>{msg.role === 'assistant' ? 'AI' : 'You'}:</strong> {msg.content}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}