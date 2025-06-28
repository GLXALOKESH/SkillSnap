import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CourseSidebar from '../Components/CourseSidebar';
import LessonContent from '../Components/LessonContent';
import QuizSection from '../Components/QuizSection';
import LessonNavigation from '../Components/LessonNavigation';

const CourseContain = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0); // Start from first module
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Start from first lesson
  const [quizResults, setQuizResults] = useState({}); // Track quiz completion

  // Course content data structure
  const courseContent = {
    modules: [
      {
        title: "Module 1: Understanding the Foundations",
        lessons: [
          {
            title: "What is Web3?",
            content: "Web3, often referred to as the decentralized web, represents the next evolution of the internet. Unlike Web1 (static pages) and Web2 (interactive platforms controlled by centralized corporations), Web3 aims to give users more control over their data, content, and online interactions.",
            keyPoints: [
              "Web3 is built on blockchain technology",
              "It provides transparency and security",
              "Users have more control over their data",
              "Eliminates need for intermediaries"
            ],
            examples: "Examples include decentralized finance (DeFi), NFT marketplaces, and DAOs.",
            importantNotes: "Web3 is still evolving and faces challenges like scalability and user adoption.",
            quiz: {
              question: "What is the main goal of Web3?",
              options: [
                "To centralize the internet",
                "To give users more control and ownership",
                "To create static web pages",
                "To increase corporate power"
              ],
              answerIndex: 1
            }
          },
          {
            title: "Blockchain Technology: The Backbone of Web3",
            content: "Blockchain technology is the foundation upon which Web3 is built. It is a distributed, immutable ledger that records transactions in a secure and transparent manner.",
            keyPoints: [
              "Decentralized and distributed",
              "Immutable and transparent",
              "Secured by cryptography",
              "No single point of failure"
            ],
            examples: "Bitcoin, Ethereum, and other blockchain networks demonstrate these principles.",
            importantNotes: "Understanding blockchain is crucial for grasping Web3 concepts.",
            quiz: {
              question: "What is the core characteristic of blockchain technology?",
              options: [
                "Centralized control",
                "Immutability",
                "Lack of transparency",
                "Single point of failure"
              ],
              answerIndex: 1
            }
          },
          {
            title: "Decentralization: Power to the People",
            content: "Decentralization is a cornerstone of Web3. It refers to the distribution of control and decision-making power away from central authorities to a network of users.",
            keyPoints: [
              "No single controlling entity",
              "Enhanced security and transparency",
              "Greater user autonomy",
              "Resistance to censorship"
            ],
            examples: "Decentralized networks like IPFS and blockchain protocols demonstrate this principle.",
            importantNotes: "Decentralization brings both opportunities and challenges in governance.",
            quiz: {
              question: "What does decentralization mean in Web3?",
              options: [
                "Concentrating power in a central authority",
                "Distributing control across a network",
                "Eliminating user autonomy",
                "Increasing censorship"
              ],
              answerIndex: 1
            }
          },
          {
            title: "Key Components of Web3",
            content: "Web3 is composed of several key components working together to create a decentralized internet including blockchain, cryptocurrencies, smart contracts, DApps, DAOs, and NFTs.",
            keyPoints: [
              "Blockchain as the foundation",
              "Cryptocurrencies for transactions",
              "Smart contracts for automation",
              "DApps for decentralized applications"
            ],
            examples: "Popular Web3 components include Ethereum smart contracts, Bitcoin cryptocurrency, and Uniswap DApp.",
            importantNotes: "All components work together to create the Web3 ecosystem.",
            quiz: {
              question: "Which of the following is NOT a key component of Web3?",
              options: [
                "Blockchain",
                "Smart Contracts",
                "Centralized servers",
                "Cryptocurrencies"
              ],
              answerIndex: 2
            }
          }
        ]
      },
      {
        title: "Module 2: Core Concepts of Web3",
        lessons: [
          {
            title: "Cryptocurrencies: Digital Money",
            content: "Cryptocurrencies are digital or virtual currencies that use cryptography for security. They are decentralized and not controlled by any single entity.",
            keyPoints: [
              "Digital and virtual currencies",
              "Secured by cryptography",
              "Decentralized nature",
              "No central authority control"
            ],
            examples: "Bitcoin, Ethereum, and other cryptocurrencies enable peer-to-peer transactions.",
            importantNotes: "Cryptocurrencies can be volatile and require careful consideration.",
            quiz: {
              question: "What is a cryptocurrency?",
              options: [
                "A physical coin",
                "A digital or virtual currency",
                "A type of stock",
                "A government-issued currency"
              ],
              answerIndex: 1
            }
          },
          {
            title: "Smart Contracts: Automated Agreements",
            content: "Smart contracts are self-executing contracts with terms directly written into code. They automatically enforce agreements when conditions are met.",
            keyPoints: [
              "Self-executing contracts",
              "Written in code",
              "Automatic execution",
              "No intermediaries needed"
            ],
            examples: "DeFi protocols use smart contracts for lending, borrowing, and trading.",
            importantNotes: "Smart contracts are immutable once deployed, so thorough testing is essential.",
            quiz: {
              question: "What are smart contracts?",
              options: [
                "Paper-based agreements",
                "Self-executing contracts written in code",
                "Verbal agreements",
                "Legal documents requiring lawyers"
              ],
              answerIndex: 1
            }
          },
          {
            title: "DAOs: Decentralized Autonomous Organizations",
            content: "DAOs are organizations governed by rules encoded in smart contracts, making them autonomous and transparent with decisions made through community voting.",
            keyPoints: [
              "Governed by smart contracts",
              "Community-driven decisions",
              "Transparent operations",
              "No traditional hierarchy"
            ],
            examples: "MakerDAO and Compound are examples of successful DAOs in DeFi.",
            importantNotes: "DAO governance requires active community participation.",
            quiz: {
              question: "How are decisions made in a DAO?",
              options: [
                "By a central CEO",
                "Through proposals and voting by members",
                "By a board of directors",
                "By government regulation"
              ],
              answerIndex: 1
            }
          },
          {
            title: "NFTs: Unique Digital Assets",
            content: "NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of items, whether digital or physical. Each NFT is unique and cannot be replicated.",
            keyPoints: [
              "Unique digital assets",
              "Prove ownership",
              "Cannot be replicated",
              "Built on blockchain"
            ],
            examples: "Digital art, music, gaming items, and virtual real estate can be represented as NFTs.",
            importantNotes: "NFT value can be highly speculative and volatile.",
            quiz: {
              question: "What makes NFTs unique?",
              options: [
                "They are interchangeable",
                "They are unique and cannot be replicated",
                "They are centrally controlled",
                "They are not built on blockchain"
              ],
              answerIndex: 1
            }
          }
        ]
      },
      {
        title: "Module 3: The Web3 Ecosystem",
        lessons: [
          {
            title: "Wallets and Transactions",
            content: "Digital wallets are essential tools for managing cryptocurrencies and interacting with Web3 applications. They store private keys and enable secure transactions.",
            keyPoints: [
              "Store private keys securely",
              "Enable cryptocurrency transactions",
              "Interact with DApps",
              "Custodial vs non-custodial options"
            ],
            examples: "MetaMask, Trust Wallet, and Coinbase Wallet are popular Web3 wallets.",
            importantNotes: "Never share your private keys or seed phrases with anyone.",
            quiz: {
              question: "What is the main purpose of a Web3 wallet?",
              options: [
                "Storing physical cash",
                "Managing cryptocurrencies and interacting with DApps",
                "Creating social media profiles",
                "Writing code"
              ],
              answerIndex: 1
            }
          },
          {
            title: "DApps (Decentralized Applications)",
            content: "DApps are applications that run on decentralized networks, typically blockchains, rather than centralized servers. They offer services without relying on central authorities.",
            keyPoints: [
              "Run on decentralized networks",
              "Open source code",
              "No central authority",
              "Resistant to censorship"
            ],
            examples: "Uniswap, OpenSea, and Compound are popular DApps in the Ethereum ecosystem.",
            importantNotes: "DApps may have slower performance compared to traditional apps.",
            quiz: {
              question: "What are DApps?",
              options: [
                "Centralized applications",
                "Decentralized applications",
                "Mobile applications",
                "Desktop applications"
              ],
              answerIndex: 1
            }
          },
          {
            title: "The Metaverse and Web3",
            content: "The metaverse represents persistent, shared virtual worlds where Web3 enables true digital ownership, interoperability, and decentralized governance.",
            keyPoints: [
              "Persistent virtual worlds",
              "True digital ownership",
              "Interoperability between platforms",
              "Decentralized governance"
            ],
            examples: "Decentraland, The Sandbox, and Axie Infinity showcase Web3 metaverse concepts.",
            importantNotes: "The metaverse is still in early development with many technical challenges.",
            quiz: {
              question: "How does Web3 enhance the metaverse?",
              options: [
                "By providing centralized control",
                "By enabling true digital ownership and interoperability",
                "By limiting user interaction",
                "By reducing virtual experiences"
              ],
              answerIndex: 1
            }
          },
          {
            title: "The Future of Web3 and its Impact",
            content: "Web3 has the potential to revolutionize how we interact with the internet, enabling new economic models, governance structures, and digital experiences while addressing current limitations.",
            keyPoints: [
              "New economic models",
              "Improved digital ownership",
              "Enhanced privacy and security",
              "Global accessibility"
            ],
            examples: "DeFi is already changing finance, while NFTs are transforming digital ownership.",
            importantNotes: "Web3 adoption faces challenges including scalability, usability, and regulation.",
            quiz: {
              question: "What is a key potential impact of Web3?",
              options: [
                "Increased centralization",
                "New economic models and improved digital ownership",
                "Reduced internet access",
                "Less innovation"
              ],
              answerIndex: 1
            }
          }
        ]
      }
    ]
  };

  const currentModule = courseContent.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];
  const totalModules = courseContent.modules.length;
  const totalLessonsInModule = currentModule?.lessons.length;

  // Calculate total lessons across all modules
  const totalLessons = courseContent.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = courseContent.modules.slice(0, currentModuleIndex).reduce((acc, module) => acc + module.lessons.length, 0) + currentLessonIndex + 1;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const handlePreviousLesson = () => {
    if (currentLessonIndex === 0) {
      if (currentModuleIndex > 0) {
        setCurrentModuleIndex(currentModuleIndex - 1);
        setCurrentLessonIndex(courseContent.modules[currentModuleIndex - 1].lessons.length - 1);
      }
    } else {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex === totalLessonsInModule - 1) {
      if (currentModuleIndex < totalModules - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentLessonIndex(0);
      }
    } else {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handleQuizComplete = (passed) => {
    const lessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
    setQuizResults(prev => ({
      ...prev,
      [lessonKey]: passed
    }));
  };

  const handleCourseComplete = () => {
    // Navigate to certificate page
    navigate('/certificate');
  };

  const currentLessonKey = `${currentModuleIndex}-${currentLessonIndex}`;
  const isQuizPassed = quizResults[currentLessonKey] || false;
  const isFirstLesson = currentModuleIndex === 0 && currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === totalLessonsInModule - 1;
  const isLastModule = currentModuleIndex === totalModules - 1;
  const isCourseComplete = progressPercentage === 100 && isQuizPassed;

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Course Navigation Sidebar */}
      <CourseSidebar 
        currentModule={currentModule}
        currentLesson={currentLesson}
        currentModuleIndex={currentModuleIndex}
        currentLessonIndex={currentLessonIndex}
        totalModules={totalModules}
        totalLessonsInModule={totalLessons}
        progressPercentage={progressPercentage}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            key={`${currentModuleIndex}-${currentLessonIndex}`}
          >
            {/* Mobile Back Button */}
            <div className="lg:hidden mb-6">
              <Link 
                to="/course" 
                className="inline-block text-pink-500 hover:text-pink-400 transition-colors"
              >
                ← Back to Course Generator
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
                {currentLesson.title}
              </h1>
              <p className="text-gray-400">
                Module {currentModuleIndex + 1}, Lesson {currentLessonIndex + 1} • {progressPercentage}% Complete
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Lesson Content */}
              <LessonContent lesson={currentLesson} />

              {/* Quiz Section */}
              {currentLesson.quiz && (
                <QuizSection 
                  quiz={currentLesson.quiz} 
                  onComplete={handleQuizComplete} 
                />
              )}

              {/* Navigation Buttons */}
              <LessonNavigation 
                onPrevious={handlePreviousLesson}
                onNext={handleNextLesson}
                onComplete={handleCourseComplete}
                isFirstLesson={isFirstLesson}
                isLastLesson={isLastLesson}
                isLastModule={isLastModule}
                isQuizPassed={isQuizPassed}
                isCourseComplete={isCourseComplete}
                progressPercentage={progressPercentage}
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CourseContain;
