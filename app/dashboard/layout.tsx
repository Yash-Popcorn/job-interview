'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/signin');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
        </svg>
      ),
      path: '/dashboard'
    },
    { 
      id: 'practice', 
      name: 'Practice Interview', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
        </svg>
      ),
      path: '/dashboard/practice'
    },
    { 
      id: 'progress', 
      name: 'View Progress', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
        </svg>
      ),
      path: '/dashboard/progress'
    },
    { type: 'divider' },
    { 
      id: 'resources', 
      name: 'Resources', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
        </svg>
      ),
      path: '/dashboard/resources'
    },
    { 
      id: 'cv', 
      name: 'Add CV', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"/>
        </svg>
      ),
      path: '/dashboard/cv'
    },
    { type: 'divider' },
    { 
      id: 'fix-cv', 
      name: 'Fix CV', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      ),
      path: '/dashboard/fix-cv'
    },
    { 
      id: 'emails', 
      name: 'Draft Emails', 
      icon: (
        <svg className="w-5 h-5 fill-[#413735]" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
        </svg>
      ),
      path: '/dashboard/draft'
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#FFFDF9]">
        {/* Logo and Brand */}
        <div className="p-6">
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full bg-[#EA6658] text-white rounded-full py-3 px-4 flex items-center justify-center font-medium"
          >
            GetJobAI
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-2">
          {menuItems.map((item, index) => (
            item.type === 'divider' ? (
              <div key={index} className="my-2 border-t border-gray-200" />
            ) : (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center px-6 py-3 text-left text-[#413735]
                  transition-colors duration-200
                  ${pathname === item.path 
                    ? 'bg-black/5 font-medium' 
                    : 'hover:bg-black/5'}`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            )
          ))}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <span className="font-medium text-sm text-[#413735]">{user.fullName}</span>
            </div>
            <SignOutButton>
              <button className="text-sm text-[#413735] hover:text-[#EA6658]">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}