'use client';
import { useEffect, useState } from 'react';

interface Resume {
  id: string;
  file_name: string;
  content: string;
  created_at: string;
}

interface LinkedInData {
  id: string;
  full_name: string;
  created_at: string;
  profile_data: any;
}

export default function StoredData() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [linkedinData, setLinkedinData] = useState<LinkedInData[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedResumes = localStorage.getItem('resumes');
    const savedLinkedinData = localStorage.getItem('linkedin_data');

    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
    if (savedLinkedinData) {
      setLinkedinData(JSON.parse(savedLinkedinData));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Stored Data</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Resumes</h2>
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white p-4 rounded-lg shadow" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <p className="font-medium">{resume.file_name}</p>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(resume.created_at).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {resume.content.substring(0, 200)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">LinkedIn Data</h2>
          <div className="space-y-4">
            {linkedinData.map((data) => (
              <div key={data.id} className="bg-white p-4 rounded-lg shadow">
                <p className="font-medium">{data.full_name}</p>
                <p className="text-sm text-gray-500">
                  Added: {new Date(data.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 