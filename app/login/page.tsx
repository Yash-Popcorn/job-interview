'use client';
import { SignUp } from "@clerk/nextjs";
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <SignUp 
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
          path="/login"
        />
      </div>
    </div>
  );
} 