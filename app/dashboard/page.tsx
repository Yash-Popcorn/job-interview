'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Evaluation {
  id: number;
  timestamp: string;
  evaluation: {
    object: {
      relevance: number;
      clarity: number;
      specificStrengths: string[];
      improvementAreas: string[];
      followUpQuestions: string[];
      meetsCriteria: boolean;
    };
    response: {
      id: string;
      timestamp: string;
      modelId: string;
      // ... other response fields
    };
  };
  response: string;
}

export default function Dashboard() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedEvaluations = localStorage.getItem('interview_evaluations');
    if (savedEvaluations) {
      setEvaluations(JSON.parse(savedEvaluations));
    }
    console.log(savedEvaluations);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF5F2] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FFFDF9] border-2 border-[#5B524F] rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-[#1D1B1B] mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Stats Cards */}
            <div className="bg-white p-6 rounded-lg border-2 border-[#5B524F] shadow-md">
              <h3 className="font-semibold text-lg text-[#1D1B1B] mb-2">Quick Start</h3>
              <p className="text-gray-600 mb-4">Begin your interview preparation journey</p>
              <button 
                onClick={() => router.push('/dashboard/practice')}
                className="w-full bg-[#FF4F01] text-white py-2 rounded-full font-semibold 
                  hover:bg-[#E64600] transform transition-all duration-200 
                  hover:scale-105 hover:-translate-y-1">
                Start Practice Session
              </button>
            </div>
          </div>

          {/* Interview Evaluations Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#1D1B1B] mb-4">Recent Interview Evaluations</h2>
            <div className="space-y-4 max-h-[30vh] overflow-y-auto">
              {evaluations.length === 0 ? (
                <div className="bg-white p-6 rounded-lg border-2 border-[#5B524F] text-gray-600">
                  No interview evaluations yet. Complete an interview to see your results here.
                </div>
              ) : (
                evaluations.map((evaluation) => (
                  <div key={evaluation.id} className="bg-white p-6 rounded-lg border-2 border-[#5B524F] shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-[#1D1B1B]">Interview Response Evaluation</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(evaluation.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        evaluation.evaluation.object.meetsCriteria 
                          ? 'bg-[#ECFDF3] text-[#027A48]' 
                          : 'bg-[#FEF3F2] text-[#B42318]'
                      }`}>
                        {evaluation.evaluation.object.meetsCriteria ? 'Meets Criteria' : 'Needs Improvement'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {['Relevance', 'Clarity'].map((metric, index) => (
                        <div key={metric} className="text-center p-3 bg-[#F5F3EB] rounded-lg border border-[#5B524F]">
                          <div className="text-2xl font-bold text-[#1D1B1B]">
                            {evaluation.evaluation.object[metric.toLowerCase() as keyof typeof evaluation.evaluation.object]}/10
                          </div>
                          <div className="text-sm text-gray-600">{metric}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">Your Response:</h4>
                        <p className="text-gray-600 text-sm">{evaluation.response}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Strengths:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {evaluation.evaluation.object.specificStrengths?.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          )) || 'No specific strengths recorded'}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Areas for Improvement:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {evaluation.evaluation.object.improvementAreas?.map((area, i) => (
                            <li key={i}>{area}</li>
                          )) || 'No improvement areas recorded'}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Follow-up Questions:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {evaluation.evaluation.object.followUpQuestions?.map((question, i) => (
                            <li key={i}>{question}</li>
                          )) || 'No follow-up questions recorded'}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}