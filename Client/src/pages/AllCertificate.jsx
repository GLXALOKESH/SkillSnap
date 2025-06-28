import React from 'react';
import { motion } from 'framer-motion';

const AllCertificate = () => {
  // Demo certificate data
  const certificates = {
    completed: [
      {
        id: 1,
        title: "AI Fundamentals",
        completionDate: "June 15, 2025",
        grade: "A",
        status: "completed",
        issuer: "SkillSnap Academy",
        chainId: "0x123...789"
      },
      {
        id: 2,
        title: "Web Development Mastery",
        completionDate: "May 28, 2025",
        grade: "A+",
        status: "completed",
        issuer: "SkillSnap Academy",
        chainId: "0x456...012"
      }
    ],
    pending: [
      {
        id: 3,
        title: "Blockchain Development",
        requiredScore: 85,
        currentScore: 82,
        status: "pending",
        estimatedCompletion: "2 days remaining"
      },
      {
        id: 4,
        title: "Machine Learning Basics",
        requiredScore: 80,
        currentScore: 75,
        status: "pending",
        estimatedCompletion: "5 days remaining"
      }
    ],
    ongoing: [
      {
        id: 5,
        title: "Cloud Computing Fundamentals",
        progress: 45,
        status: "ongoing",
        lastActivity: "2 hours ago"
      },
      {
        id: 6,
        title: "Cybersecurity Essentials",
        progress: 30,
        status: "ongoing",
        lastActivity: "1 day ago"
      }
    ]
  };

  const totalCertificates = certificates.completed.length + certificates.ongoing.length;
  const completionRate = Math.round((certificates.completed.length / totalCertificates) * 100);

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
                All Certificates
              </h1>
              <p className="text-gray-400">
                Track all your certificates and learning progress
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-green-400 mb-2">Completed</h3>
                <p className="text-2xl font-bold text-white">{certificates.completed.length}</p>
              </motion.div>
              
              <motion.div
                className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-2">In Progress</h3>
                <p className="text-2xl font-bold text-white">{certificates.ongoing.length}</p>
              </motion.div>
              
              <motion.div
                className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-pink-400 mb-2">Completion Rate</h3>
                <p className="text-2xl font-bold text-white">{completionRate}%</p>
              </motion.div>
            </div>

            {/* Certificate Sections */}
            <div className="space-y-8">
              {certificates.completed.length > 0 && (
                <CertificateSection
                  title="🏆 Completed Certificates"
                  items={certificates.completed}
                  type="completed"
                />
              )}
              
              {certificates.ongoing.length > 0 && (
                <CertificateSection
                  title="📚 In Progress"
                  items={certificates.ongoing}
                  type="ongoing"
                />
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const CertificateSection = ({ title, items, type }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={`bg-[#2a2a2a] rounded-xl p-6 border transition-all hover:border-pink-500 ${
              type === 'pending' && item.currentScore < item.requiredScore
                ? 'border-red-600 bg-red-900/20'
                : 'border-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <StatusBadge status={item.status} />
            </div>

            {type === 'completed' && (
              <>
                <div className="text-gray-400 mb-2">Completed: {item.completionDate}</div>
                <div className="text-gray-400 mb-2">Grade: {item.grade}</div>
                <div className="text-gray-400 mb-2">Issuer: {item.issuer}</div>
                <div className="text-sm text-pink-400">Chain ID: {item.chainId}</div>
                <div className="mt-4">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    View Certificate
                  </button>
                </div>
              </>
            )}

            {type === 'pending' && (
              <>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Current Score</span>
                    <span>Required: {item.requiredScore}%</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                      <div
                        style={{ width: `${(item.currentScore / item.requiredScore) * 100}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          item.currentScore >= item.requiredScore
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {item.currentScore}% / {item.requiredScore}%
                  </div>
                </div>
                <div className="text-sm text-yellow-400 mb-4">{item.estimatedCompletion}</div>
                <div className="mt-4">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    Continue Learning
                  </button>
                </div>
              </>
            )}

            {type === 'ongoing' && (
              <>
                <div className="relative pt-1 mb-4">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                    <div
                      style={{ width: `${item.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-600"
                    ></div>
                  </div>
                </div>
                <div className="text-gray-400 mb-2">Progress: {item.progress}%</div>
                <div className="text-sm text-blue-400 mb-4">Last activity: {item.lastActivity}</div>
                <div className="mt-4">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
                    Continue Course
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
    completed: "bg-green-500/20 text-green-400 border border-green-500/20",
    pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20",
    ongoing: "bg-blue-500/20 text-blue-400 border border-blue-500/20"
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusStyles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default AllCertificate;
