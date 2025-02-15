'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Practice() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-[#FEF5F2] p-8 flex items-center justify-center">
            <div className={`max-w-4xl mx-auto transition-all duration-700 transform 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-2xl p-12 shadow-lg text-center">
                    <div className="mb-8">
                        <svg 
                            className="w-20 h-20 mx-auto text-[#FF4F01]" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M12 20h9"/>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                        </svg>
                    </div>

                    <h1 className="text-4xl font-bold text-[#1D1B1B] mb-6">
                        Ready to Practice Your Interview Skills?
                    </h1>

                    <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
                        Start a simulated interview session and get real-time feedback 
                        on your responses. Our AI will adapt to your performance and 
                        help you improve.
                    </p>

                    <Link
                        href="/simulation"
                        className="inline-flex items-center px-8 py-4 bg-[#FF4F01] text-white 
                            rounded-full font-semibold hover:bg-[#E64600] transform transition-all 
                            duration-200 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl 
                            active:scale-95"
                    >
                        <span>Start Practice Session</span>
                        <svg 
                            className="w-5 h-5 ml-2" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}