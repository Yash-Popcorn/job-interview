'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleDummySignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (email) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({
        name: email.split('@')[0],
        email: email,
        image: '/placeholder-avatar.png'
      }));
      router.push('/dashboard');
    }
  };

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

      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image
              src="/icon.png"
              alt="GetJobAI Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold">Welcome to Get<span className="text-blue-600">Job</span>AI</h2>
          <p className="mt-2 text-gray-600">Sign in to start your interview prep</p>
        </div>

        <form onSubmit={handleDummySignIn} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
                focus:border-black focus:ring-black focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent 
              rounded-md shadow-sm text-white bg-black hover:bg-gray-800 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
              transition-colors duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
} 