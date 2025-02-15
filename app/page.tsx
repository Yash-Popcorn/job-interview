'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const useInView = (options = {}) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasBeenVisible(true);
        // Once element has been visible, disconnect the observer
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { ref: elementRef, inView: hasBeenVisible };
};

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  
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
      title: "Clerk",
      image: "/clerk.png"
    },
    {
      title: "Cursor",
      image: "/cursor.png"
    },
    {
      title: "Deepseek",
      image: "/deepseek.png"
    },
    {
      title: "Figma",
      image: "/figma.png"
    },
    {
      title: "Vercel",
      image: "/vercel.png"
    },
    {
      title: "Proxycurl",
      image: "/proxycurl.png"
    }
  ];

  const featureImages = {
    0: "/chatbot.png",    // Placeholder for Feature 1
    1: "/wompwomp1.png",    // Placeholder for Feature 2
    2: "/wompwomp2.png",    // Placeholder for Feature 3
    3: "/wompwomp3.png"     // Placeholder for Feature 4
  };

  const techStackRef = useInView({ threshold: 0.2 });
  const featuresRef = useInView({ threshold: 0.2 });
  const useCasesRef = useInView({ threshold: 0.2 });
  const ctaRef = useInView({ threshold: 0.2 });

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId: number;

    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      let scrollPos = 0;

      const scroll = () => {
        scrollPos += 1; // Adjust speed by changing this value
        if (scrollPos >= scrollWidth / 3) { // Divide by 3 since we have 3 copies of the stack
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
        animationFrameId = requestAnimationFrame(scroll);
      };

      animationFrameId = requestAnimationFrame(scroll);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
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
              Get<span className="text-[#EA6658]">Job</span>AI
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-700 mb-12">
              Your <span className="text-[#EA6658] font-semibold text-2xl">AI-powered</span> interview coach that helps you prepare, practice, and 
              perfect your interview skills. Get personalized feedback and improve 
              your chances of landing your <span className="text-[#EA6658] font-semibold text-2xl">dream job</span>.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex gap-4">
              <Link
                href="/signin"
                className="bg-[#EA6658] text-white px-6 py-2 rounded-full font-semibold
                  hover:bg-[#EA6658]/80 transform transition-all duration-200 
                  hover:scale-105"
              >
                Get Started
              </Link>
              <button
                onClick={scrollToLearnMore}
                className="bg-transparent text-[#EA6658] px-6 py-2 rounded-full font-semibold
                  border-2 border-[#EA6658] hover:bg-[#EA6658]/10 transform transition-all 
                  duration-200 hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column - Overlapping Images */}
          <div className="relative h-[600px] w-full">
            {/* Top image */}
            <div className="absolute top-0 right-20 w-[300px] h-[300px] z-20">
              <Image
                src="/interview1.png"
                alt="Interview Illustration 1"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            {/* Bottom left image */}
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] z-10">
              <Image
                src="/interview2.png"
                alt="Interview Illustration 2"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            {/* Bottom right image */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] z-30">
              <Image
                src="/interview3.png"
                alt="Interview Illustration 3"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Tech Stack Section - Dark mode */}
      <section 
        id="learn-more" 
        className={`mt-16 py-4 bg-[#262626] overflow-hidden opacity-0 transition-opacity duration-1000 ${
          techStackRef.inView ? 'opacity-100' : ''
        }`}
        ref={techStackRef.ref}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-[18px] font-bold text-center mb-4 text-white font-['Arial']">
            Our Technology Stack
          </h2>
          
          <div className="relative w-full">
            <div
              ref={scrollRef} // Attach the ref here
              className="flex overflow-x-hidden space-x-16 py-1 items-center justify-center"
            >
              {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                <div
                  key={index}
                  className={`flex-none relative flex items-center justify-center ${
                    tech.title === "Proxycurl" ? "w-28 h-28" : "w-20 h-20"
                  }`}
                >
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section 
        className={`py-20 bg-white opacity-0 transition-opacity duration-1000 ${
          featuresRef.inView ? 'opacity-100' : ''
        }`}
        ref={featuresRef.ref}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-medium mb-16 text-center tracking-tight">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Steps */}
            <div className="space-y-12">
              {[
                {
                  title: "Real-time Interview Practice",  // Feature 1
                  description: "Practice with AI-powered interviewers that adapt to your responses and provide instant feedback."
                },
                {
                  title: "Performance Analytics",         // Feature 2
                  description: "Track your progress with detailed metrics and improvement suggestions."
                },
                {
                  title: "Custom Interview Scenarios",    // Feature 3
                  description: "Practice industry-specific interviews tailored to your career goals."
                },
                {
                  title: "Professional Development Tools", // Feature 4
                  description: "Access resume builders, LinkedIn optimization, and career resources."
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="relative transition-all duration-300 ease-in-out"
                >
                  <div 
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-start">
                      <div className={`mr-4 text-2xl font-light tracking-wide transition-colors duration-300 ease-in-out ${
                        expandedStep === index ? 'text-black' : 'text-gray-400'
                      }`}>
                        {index + 1}.
                      </div>
                      <div className="relative">
                        <h3 className={`text-2xl font-light tracking-wide transition-colors duration-300 ease-in-out ${
                          expandedStep === index ? 'text-black' : 'text-gray-400'
                        }`}>
                          {step.title}
                        </h3>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          expandedStep === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="border-l-2 border-[#EA6658] pl-4">
                            <p className="text-gray-600 text-lg font-light leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Preview Window */}
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-2">
                <div className="relative h-[400px]">
                  <Image
                    src={featureImages[expandedStep as keyof typeof featureImages]}
                    alt={`Feature ${(expandedStep || 0) + 1}`}
                    fill
                    className="rounded-lg object-contain transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Slightly darker white */}
      <section 
        className={`py-20 bg-[#f9fafb] opacity-0 transition-opacity duration-1000 ${
          useCasesRef.inView ? 'opacity-100' : ''
        }`}
        ref={useCasesRef.ref}
      >
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
      <section 
        className={`py-20 bg-black text-white opacity-0 transition-opacity duration-1000 ${
          ctaRef.inView ? 'opacity-100' : ''
        }`}
        ref={ctaRef.ref}
      >
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
            className="inline-block bg-white text-black px-6 py-2 rounded-full 
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