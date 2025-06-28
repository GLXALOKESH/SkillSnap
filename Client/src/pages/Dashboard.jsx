import React from 'react';
import NavBar from '../Components/NavBar';

const Dashboard = () => {
  // Example user data - you can replace this with real user data from your auth system
  const user = {
    name: "Alex Johnson",
    avatar: null // You can set an image URL here like: "https://example.com/avatar.jpg"
  };

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Navigation Sidebar */}
      <NavBar user={user} />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
              Welcome to SkillSnap Dashboard
            </h1>
            <p className="text-gray-400 mb-6">
              This is your learning hub. Navigate using the sidebar to explore different sections.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#2a2a2a] p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Recent Courses</h3>
                <p className="text-gray-400 text-sm">Continue your learning journey</p>
              </div>
              
              <div className="bg-[#2a2a2a] p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Certificates</h3>
                <p className="text-gray-400 text-sm">View your earned certificates</p>
              </div>
              
              <div className="bg-[#2a2a2a] p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Progress</h3>
                <p className="text-gray-400 text-sm">Track your learning progress</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
