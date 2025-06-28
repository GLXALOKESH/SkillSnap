import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CourseStructure = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch course data
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call using the courseId
        // For now, we'll use our demo data
        const courseData = {
          title: "Web3 Fundamentals: A Beginner's Guide",
          description: "Embark on your Web3 journey! This course provides a concise introduction to the core concepts of Web3, covering blockchain technology, decentralization, cryptocurrencies, and smart contracts. Learn how Web3 is shaping the future of the internet.",
          modules: [
            {
              title: "Module 1: Understanding the Foundations",
              lessons: [
                "Lesson 1: What is Web3?",
                "Lesson 2: Blockchain Technology: The Backbone of Web3",
                "Lesson 3: Decentralization: Power to the People",
                "Lesson 4: Key Components of Web3"
              ]
            },
            {
              title: "Module 2: Core Concepts of Web3",
              lessons: [
                "Lesson 1: Cryptocurrencies: Digital Money",
                "Lesson 2: Smart Contracts: Automated Agreements",
                "Lesson 3: DAOs: Decentralized Autonomous Organizations",
                "Lesson 4: NFTs: Unique Digital Assets"
              ]
            },
            {
              title: "Module 3: The Web3 Ecosystem",
              lessons: [
                "Lesson 1: Wallets and Transactions",
                "Lesson 2: DApps (Decentralized Applications)",
                "Lesson 3: The Metaverse and Web3",
                "Lesson 4: The Future of Web3 and its Impact"
              ]
            }
          ]
        };
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course:', error);
        // Optionally navigate to an error page
        // navigate('/error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-300">Loading your course...</p>
        </motion.div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-400 mb-4">Course not found</h2>
          <Link to="/course" className="text-pink-500 hover:text-pink-400">
            ← Back to Course Generator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative z-10 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <Link 
                  to="/course" 
                  className="inline-block text-pink-500 hover:text-pink-400 mb-6 transition-colors"
                >
                  ← Back to Course Generator
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
                  {course.title}
                </h1>
                <p className="text-gray-400">
                  {course.description}
                </p>
              </div>

              {/* Course Content */}
              <div className="space-y-8">
                {course.modules.map((module, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#2a2a2a] p-6 rounded-xl border border-gray-700 hover:border-pink-500 transition-all"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">{module.title}</h3>
                    <ul className="space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="text-gray-300 flex items-center">
                          <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Start Course Button */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  onClick={() => navigate(`/learn/${courseId}`)}
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-pink-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseStructure;
