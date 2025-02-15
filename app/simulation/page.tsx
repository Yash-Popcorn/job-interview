'use client'
import { useRef, useState, useEffect } from 'react'

export default function Simulation() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isRecording, setIsRecording] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const [transcript, setTranscript] = useState<string>('')
    const recognitionRef = useRef<any>(null)

    useEffect(() => {
        // Initialize speech recognition
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            recognitionRef.current = new SpeechRecognition()
            recognitionRef.current.continuous = true
            recognitionRef.current.interimResults = true

            recognitionRef.current.onresult = (event: any) => {
                let interimTranscript = ''
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript
                    if (event.results[i].isFinal) {
                        setTranscript(prev => prev + ' ' + transcript)
                    } else {
                        interimTranscript += transcript
                    }
                }
            }
        }
    }, [])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
            
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            setIsRecording(true)
            
            mediaRecorder.start()
            // Start speech recognition
            recognitionRef.current?.start()
        } catch (err) {
            console.error("Error accessing camera:", err)
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks()
            tracks?.forEach(track => track.stop())
            setIsRecording(false)
            // Stop speech recognition
            recognitionRef.current?.stop()
        }
    }

    return (
        <div className="min-h-screen bg-[#FEF5F2] p-8">
            <div className="flex flex-row gap-8">
                <div className="flex flex-col items-start">
                    <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-2xl p-6 shadow-lg">
                        <h1 className="text-xl font-bold mb-4">Interview Simulation</h1>
                        
                        <div className="mb-4">
                            <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                muted 
                                className="w-[320px] h-[240px] bg-gray-100 rounded-lg border-2 border-[#5B524F]"
                            />
                        </div>

                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className="px-6 py-3 bg-[#FF4F01] text-white rounded-full font-semibold 
                                hover:bg-[#E64600] transform transition-all duration-200 
                                hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl 
                                active:scale-95"
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Transcript</h2>
                        <div className="h-[240px] overflow-y-auto bg-white p-4 rounded-lg border-2 border-[#5B524F]">
                            {transcript || 'Your speech will appear here...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}