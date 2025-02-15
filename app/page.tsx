'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollToLearnMore = () => {
    document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' });
  };

  const useCases = [
    "Technical Interviews",
    "Behavioral Questions",
    "Leadership Scenarios",
    "System Design",
    "Problem Solving",
    "Cultural Fit",
    "Salary Negotiations",
    "Remote Work Discussions",
    "Project Management",
    "Team Collaboration",
    "Conflict Resolution",
    "Product Management",
    "Sales Pitches",
    "Customer Service",
    "Data Science Interviews",
    "Software Engineering",
    "Marketing Strategy",
    "Executive Leadership"
  ];

  const techStack = [
    {
      title: "Built With Modern Tech",
      description: "Developed using Next.js 14, TypeScript, and Tailwind CSS for a fast, type-safe, and responsive user experience. Deployed on Vercel for optimal performance."
    },
    {
      title: "Natural Language Processing",
      description: "Powered by advanced NLP models to understand and analyze interview responses with human-like comprehension. Our system uses transformers and BERT-based models to process complex language patterns."
    },
    {
      title: "AI Interview Analysis",
      description: "Real-time feedback and scoring using state-of-the-art AI models trained on successful interview patterns. Incorporates machine learning algorithms to provide personalized insights."
    },
    {
      title: "Personalized Learning",
      description: "Adaptive learning system that tailors practice sessions based on your performance and industry focus. Uses ML algorithms to adjust difficulty and focus areas."
    },
    {
      title: "Speech Recognition",
      description: "Advanced speech-to-text capabilities that capture and analyze verbal responses with high accuracy. Supports multiple accents and speaking styles."
    },
    {
      title: "Profile Optimization",
      description: "AI-powered tools to enhance your professional presence. Optimize your resume, LinkedIn profile, and portfolio with industry-specific recommendations and keyword analysis for ATS compatibility."
    },
    {
      title: "Interview Analytics",
      description: "Comprehensive analytics platform that tracks progress and provides detailed insights on interview performance over time."
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval: NodeJS.Timeout;

    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      let scrollPos = 0;

      scrollInterval = setInterval(() => {
        scrollPos += 1; // Adjust speed by changing this value
        if (scrollPos >= scrollWidth - clientWidth) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }, 30); // Adjust interval for smoother/faster scrolling
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Hero Section - Warmest white */}
      <main className="max-w-6xl mx-auto pt-20 px-4 sm:px-6 bg-[#fdfbf7]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Logo */}
            <div className="relative w-24 h-24 mb-8">
              <Image
                src="/icon.png"
                alt="GetJobAI Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Get<span className="text-blue-600">Job</span>AI
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 mb-12">
              Your <span className="text-blue-600 font-semibold">AI-powered</span> interview coach that helps you prepare, practice, and 
              perfect your interview skills. Get personalized feedback and improve 
              your chances of landing your <span className="text-green-800 font-semibold">dream job</span>.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex gap-4">
              <Link
                href="/signin"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold
                  hover:bg-blue-400 transform transition-all duration-200 
                  hover:scale-105"
              >
                Get Started
              </Link>
              <button
                onClick={scrollToLearnMore}
                className="bg-transparent text-blue-400 px-8 py-4 rounded-lg font-semibold
                  border-2 border-blue-400 hover:bg-blue-900/30 transform transition-all 
                  duration-200 hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[400px] w-full">
            <Image
              src="/interview-illustration.png"
              alt="Interview Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </main>

      {/* Tech Stack Section - Darker shade of white */}
      <section id="learn-more" className="mt-32 py-20 bg-[#f2f2f2] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Our Technology Stack
          </h2>
          
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex overflow-x-hidden space-x-6"
            >
              {[...techStack, ...techStack].map((tech, index) => (
                <div 
                  key={index}
                  className="flex-none w-80 bg-white p-8 rounded-lg
                    transform transition-all duration-300 hover:scale-110 
                    cursor-pointer border border-gray-200
                    hover:shadow-2xl hover:-translate-y-2"
                >
                  <h3 className="text-xl font-semibold mb-4 text-black">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section - Brightest white */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-red-600 mr-2">•</span>
                  Real-time Interview Practice
                </h3>
                <p className="text-gray-600 ml-6">
                  Practice with AI-powered interviewers that adapt to your responses and provide instant feedback.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-green-700 mr-2">•</span>
                  Performance Analytics
                </h3>
                <p className="text-gray-600 ml-6">
                  Track your progress with detailed metrics and improvement suggestions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-black mr-2">•</span>
                  Custom Interview Scenarios
                </h3>
                <p className="text-gray-600 ml-6">
                  Practice industry-specific interviews tailored to your career goals.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-red-600 mr-2">•</span>
                  Professional Development Tools
                </h3>
                <p className="text-gray-600 ml-6">
                  Access resume builders, LinkedIn optimization, and career resources.
                </p>
              </div>
            </div>

            {/* Right side - Images */}
            <div className="relative h-[600px] grid grid-cols-2 gap-4">
              <div className="relative w-full h-[280px]">
                <Image
                  src="/dashboard-preview.png"
                  alt="Dashboard Preview"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="relative w-full h-[280px] mt-8">
                <Image
                  src="/interview-preview.png"
                  alt="Interview Interface Preview"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="relative w-full h-[280px] -mt-8">
                <Image
                  src="/analytics-preview.png"
                  alt="Analytics Preview"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="relative w-full h-[280px]">
                <Image
                  src="/feedback-preview.png"
                  alt="Feedback Interface Preview"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Slightly darker white */}
      <section className="py-20 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Interview Scenarios We Cover
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="relative px-6 py-3 rounded-full 
                  transform transition-all duration-300 
                  cursor-pointer border border-gray-200
                  hover:border-black hover:bg-black hover:shadow-lg
                  bg-white hover:scale-105"
                >
                  <span className="text-gray-900 whitespace-nowrap
                    group-hover:text-white transition-colors duration-300">
                    {useCase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action - Black background remains unchanged */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Are You Ready to <span className="text-red-500 underline decoration-2">Level Up</span> Your Interview Game?
          </h2>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Dont let another opportunity slip away. Transform your interview skills from 
            <span className="font-bold text-gray-100"> good </span> 
            to 
            <span className="font-bold italic text-red-500"> exceptional</span>.
          </p>
          <Link
            href="/signin"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg 
              font-semibold hover:bg-gray-100 transform transition-all 
              duration-200 hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}