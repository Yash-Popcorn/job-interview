'use client';
import { SignIn } from "@clerk/nextjs";
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-black
          transition-colors duration-200"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Home
      </Link>

      <div className="max-w-md w-full space-y-8 p-8">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-black hover:bg-gray-800 text-white w-full py-3 px-4 rounded-md",
              card: "bg-white rounded-xl shadow-lg p-8",
              headerTitle: "text-3xl font-bold",
              headerSubtitle: "text-gray-600"
            }
          }}
          redirectUrl="/dashboard"
          routing="path"
        />
      </div>
    </div>
  );
} 