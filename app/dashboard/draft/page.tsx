'use client'

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

// Add this type at the top of the file
type EmailCard = {
    title: string;
    subject: string;
    content: string;
    status: string;
}

export default function Draft() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    // Initialize useChat with proper configuration
    const { messages, input, handleSubmit, handleInputChange, stop } = useChat({});
    console.log(messages)

    // Add this example data
    const emailCards: EmailCard[] = [
        {
            title: "Follow-up Email",
            subject: "Thank you for the interview opportunity",
            content: `Dear [Interviewer's Name],

Thank you for taking the time to meet with me yesterday regarding the [Position] role at [Company]. I enjoyed our conversation and learning more about the team's projects and goals.

Our discussion reinforced my enthusiasm for the position and my desire to join your team. I am particularly excited about [specific project/aspect discussed].

Please don't hesitate to reach out if you need any additional information.

Best regards,
[Your name]`,
            status: "Draft"
        }
    ];

    const handleMainInputSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        if (inputText.trim()) {
            setIsChatOpen(true);
            
            // Set the input value in the chat
            await handleInputChange({ target: { value: inputText } } as React.ChangeEvent<HTMLInputElement>);
            
            // Submit using handleSubmit directly
            await handleSubmit(undefined, {
                options: {
                    body: {
                        message: inputText
                    }
                }
            });
            
            // Clear the main input
            setInputText('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-[#FEF5F2]">
            {/* Main content with transition */}
            <div className={`transition-all duration-300 ease-in-out ${
                isChatOpen ? 'mr-96' : 'mr-0'
            }`}>
                <div className="bg-[#FFFDF9] p-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex flex-col max-w-2xl mx-auto gap-2 mb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-[32px] text-[#1D1B1B] font-bold">What would you like to write?</h2>
                                <span className="px-2 py-0.5 text-sm bg-[#FF4F01] text-white rounded-md">Reasoning Engine</span>
                            </div>
                        </div>
                        <div className="relative max-w-2xl mx-auto">
                            <div className="flex items-start w-full p-4 pr-12 rounded-xl border border-[#1D1B1B] bg-[#F5F3EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                                <svg className="w-5 h-5 mr-3 text-[#1D1B1B] mt-[2px]" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3l2.5 6h6l-5 4 2 6-5.5-4-5.5 4 2-6-5-4h6l2.5-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <textarea 
                                    rows={1}
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = target.scrollHeight + 'px';
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleMainInputSubmit();
                                        }
                                    }}
                                    className="w-full bg-transparent focus:outline-none text-[#1D1B1B] placeholder-[#1D1B1B] resize-none overflow-hidden"
                                    placeholder="Example: Write a follow-up email to the interviewer thanking them for their time."
                                />
                                <button 
                                    onClick={handleMainInputSubmit}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <svg className="w-5 h-5 text-[#1D1B1B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider and Cards Section */}
                <div className="flex-1 flex flex-col">
                    <div className="w-full h-px bg-[#D7D3C9]" />
                    <div className="w-full bg-[#FEF5F2] flex-1 p-8">
                        <div className="max-w-4xl mx-auto">
                            <table className="w-full border-collapse">
                                <tbody className="divide-y divide-[#D7D3C9]">
                                    {emailCards.map((card, index) => (
                                        <tr key={index} className="bg-white hover:bg-[#F5F3EB] transition-colors">
                                            <td className="p-4">
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-lg font-semibold text-[#1D1B1B]">{card.title}</h3>
                                                        <span className="px-2 py-0.5 text-sm bg-[#F5F3EB] text-[#1D1B1B] rounded-full">
                                                            {card.status}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-[#1D1B1B]">Subject:</p>
                                                        <p className="text-sm text-[#1D1B1B] truncate">{card.subject}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-[#1D1B1B]">Email:</p>
                                                        <p className="text-sm text-[#1D1B1B] line-clamp-2">
                                                            {card.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Sidebar */}
            {isChatOpen && (
                <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0`}>
                    <div className="h-full flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 bg-[#FFFDF9] border-b border-[#D7D3C9] flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#1D1B1B]">AI Assistant</h3>
                            <button 
                                onClick={() => setIsChatOpen(false)}
                                className="text-[#1D1B1B] hover:text-[#FF4F01]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-[#F5F3EB] space-y-4">
                            {messages.map(message => (
                                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg ${
                                        message.role === 'user' 
                                            ? 'bg-[#FF4F01] text-white' 
                                            : 'bg-white text-[#1D1B1B]'
                                    }`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}
                            
                            
                        </div>

                        {/* Chat Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-[#D7D3C9] bg-white">
                            <div className="relative">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    className="w-full p-3 pr-12 rounded-lg border border-[#D7D3C9] focus:outline-none focus:border-[#FF4F01] bg-[#FFFDF9] disabled:opacity-50"
                                />
                                <button 
                                    type="submit"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1D1B1B] hover:text-[#FF4F01] disabled:opacity-50"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}