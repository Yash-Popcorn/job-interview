'use client';
import { useState, useEffect } from 'react';

export default function UploadCV() {
  const [resumeText, setResumeText] = useState('');
  const [savedResumes, setSavedResumes] = useState<string[]>([]); // Array to store all resumes

  // Load saved resumes from localStorage on component mount
  useEffect(() => {
    const storedResumes = localStorage.getItem('resumes');
    if (storedResumes) {
      setSavedResumes(JSON.parse(storedResumes));
    }
  }, []);

  // Save resumes to localStorage whenever savedResumes changes
  useEffect(() => {
    localStorage.setItem('resumes', JSON.stringify(savedResumes));
  }, [savedResumes]);

  const handleSaveResume = () => {
    if (resumeText.trim()) {
      localStorage.setItem('resume', resumeText);
      setSavedResumes((prev) => [...prev, resumeText]); // Save new resume
      setResumeText(''); // Clear the textarea after saving
    } else {
      alert('Please enter your resume text.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF5F2] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-[#1D1B1B] mb-8">Upload Your Resume</h1>

          <div className="mb-6">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume here..."
              className="w-full h-60 p-4 bg-white border-2 border-[#5B524F] rounded-lg 
                focus:outline-none focus:border-[#FF4F01] focus:ring-1 focus:ring-[#FF4F01] 
                overflow-y-auto resize-none"
            />
          </div>

          <button
            onClick={handleSaveResume}
            className="w-full bg-[#FF4F01] text-white py-3 rounded-full font-semibold 
              hover:bg-[#E64600] transform transition-all duration-200 
              hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl 
              active:scale-95"
          >
            Save Resume
          </button>

          <h2 className="mt-10 text-xl font-semibold text-[#1D1B1B] mb-4">Saved Resumes</h2>
          <div className="space-y-4">
            {savedResumes.map((resume, index) => (
              <div 
                key={index} 
                className="bg-white p-4 rounded-lg border-2 border-[#5B524F]"
              >
                <p className="text-[#1D1B1B]">{resume}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
