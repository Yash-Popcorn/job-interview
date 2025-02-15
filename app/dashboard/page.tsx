'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface User {
  name: string;
  email: string;
  image: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/signin');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/signin');
  };

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'practice', name: 'Practice Interview', icon: '🎯' },
    { id: 'progress', name: 'View Progress', icon: '📈' },
    { id: 'resources', name: 'Resources', icon: '📚' },
    { id: 'cv', name: 'Add CV', icon: '📄' },
    { id: 'fix-cv', name: 'Fix CV', icon: '✏️' },
    { id: 'emails', name: 'Draft Emails', icon: '📧' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white">
        {/* Logo and Brand */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="relative w-8 h-8">
              <Image
                src="/icon.png"
                alt="GetJobAI Logo"
                fill
                className="object-contain rounded-md"
              />
            </div>
            <span className="ml-2 text-xl font-semibold">GetJobAI</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left
                transition-colors duration-200
                ${activeTab === item.id 
                  ? 'bg-gray-800 border-l-4 border-white' 
                  : 'hover:bg-gray-900'}`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-64 border-t border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <span className="font-medium text-sm">{user.name}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-400 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-8">
            {menuItems.find(item => item.id === activeTab)?.name}
          </h1>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'dashboard' && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Begin your interview preparation journey.
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-black text-white px-6 py-3 rounded-md 
                      hover:bg-gray-800 transform transition-all duration-200 
                      hover:scale-105">
                      Start Now
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Track your recent interview sessions and progress.
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-black text-white px-6 py-3 
                      rounded-md hover:bg-gray-800 transform 
                      transition-all duration-200 hover:scale-105">
                      View Activity
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <h2 className="text-xl font-semibold mb-4">Tips & Insights</h2>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Get personalized interview tips based on your performance.
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-black text-white px-6 py-3 
                      rounded-md hover:bg-gray-800 transform 
                      transition-all duration-200 hover:scale-105">
                      View Insights
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Add other tab contents as needed */}
          </div>
        </div>
      </div>
    </div>
  );
} 