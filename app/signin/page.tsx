'use client';
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-black hover:bg-gray-800 text-white w-full py-3 px-4 rounded-md",
              card: "bg-white rounded-xl shadow-lg p-8",
              headerTitle: "text-3xl font-bold",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: 
                "bg-white border border-gray-300 hover:bg-gray-50 text-black",
            }
          }}
          afterSignInUrl="/dashboard"
          routing="hash"
        />
      </div>
    </div>
  );
} 