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
      // Save the resume text in local storage with the key 'resume'
      localStorage.setItem('resume', resumeText);
      
      // Add the new resume to the savedResumes array
      setSavedResumes((prev) => [...prev, resumeText]); // Save new resume
      setResumeText(''); // Clear the textarea after saving
    } else {
      alert('Please enter your resume text.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Upload Your Resume</h1>

      <div className="mb-4">
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          className="w-full h-60 p-3 border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 overflow-y-auto"
          style={{ resize: 'none' }} // Prevent resizing
        />
      </div>

      <button
        onClick={handleSaveResume}
        className="mt-4 w-full bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
      >
        Save Resume
      </button>

      <h2 className="mt-8 text-xl font-semibold text-red-600">Saved Resumes</h2>
      <ul className="mt-4">
        {savedResumes.map((resume, index) => (
          <li key={index} className="flex flex-col bg-gray-100 p-2 rounded-full mb-2">
            <p>{resume}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
