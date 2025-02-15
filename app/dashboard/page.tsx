export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </>
  );
}