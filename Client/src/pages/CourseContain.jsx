import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CourseSidebar from '../components/CourseSidebar';
import LessonContent from '../components/LessonContent';
import QuizSection from '../components/QuizSection';
import LessonNavigation from '../components/LessonNavigation';
import axios from 'axios';
const url = "http://localhost:3000";

const CourseContain = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseContent, setCourseContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [quizResults, setQuizResults] = useState({});

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/courses/course/${courseId}`);
        setCourseContent(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching course content:", error);
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [courseId]);

  // Reset quiz results when changing lessons
  useEffect(() => {
    console.log('Current lesson changed to:', currentLessonIndex);
    console.log('Current quiz results:', quizResults);
  }, [currentLessonIndex, quizResults]);

  if (loading) {
    return <div className="text-center text-white">Loading course...</div>;
  }

  if (!courseContent) {
    return <div className="text-center text-white">Course not found.</div>;
  }

  const currentLesson = courseContent.lessons[currentLessonIndex];
  console.log('Current lesson:', currentLesson);
  
  const totalLessons = courseContent.lessons.length;
  const progressPercentage = Math.round(((currentLessonIndex + 1) / totalLessons) * 100);

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handleQuizComplete = (quizIndex, passed) => {
    const quizKey = `${currentLessonIndex}-${quizIndex}`;
    console.log(`Quiz completed: ${quizKey} = ${passed}`);
    setQuizResults(prev => {
      const newResults = {
        ...prev,
        [quizKey]: passed
      };
      console.log('Updated quiz results:', newResults);
      return newResults;
    });
  };

  const handleCourseComplete = () => {
    navigate('/certificate');
  };

  // Improved quiz passing logic with better debugging
  const isQuizPassed = (() => {
    // If no quiz or no questions, consider it passed
    if (!currentLesson.quiz || !currentLesson.quiz.questions || currentLesson.quiz.questions.length === 0) {
      console.log('No quiz for this lesson, marking as passed');
      return true;
    }

    const totalQuestions = currentLesson.quiz.questions.length;
    console.log(`Checking ${totalQuestions} questions for lesson ${currentLessonIndex}`);

    const allPassed = currentLesson.quiz.questions.every((_, index) => {
      const quizKey = `${currentLessonIndex}-${index}`;
      const isPassed = quizResults[quizKey] === true;
      console.log(`Question ${index}: ${quizKey} = ${isPassed}`);
      return isPassed;
    });

    console.log('All questions passed:', allPassed);
    return allPassed;
  })();

  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === totalLessons - 1;
  const isCourseComplete = progressPercentage === 100 && isQuizPassed;

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Course Navigation Sidebar */}
      <CourseSidebar 
        course={courseContent}
        currentLesson={currentLesson}
        currentLessonIndex={currentLessonIndex}
        totalLessons={totalLessons}
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
            key={`${currentLessonIndex}`}
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
                Lesson {currentLessonIndex + 1} of {totalLessons} • {progressPercentage}% Complete
              </p>
            </div>

            {/* Debug Info - Remove this in production */}
            <div className="mb-4 p-4 bg-gray-800 rounded-lg text-sm">
              <p>Debug Info:</p>
              <p>Quiz Passed: {isQuizPassed ? 'Yes' : 'No'}</p>
              <p>Quiz Questions: {currentLesson.quiz?.questions?.length || 0}</p>
              <p>Quiz Results: {JSON.stringify(quizResults)}</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Lesson Content */}
              <LessonContent lesson={currentLesson} />
            
              {/* Quiz Section */}
              {currentLesson.quiz?.questions?.map((question, index) => (
                <QuizSection
                  key={`${currentLessonIndex}-${index}`} // More specific key
                  quiz={question}
                  onComplete={(passed) => handleQuizComplete(index, passed)}
                />
              ))}

              {/* Navigation Buttons */}
              <LessonNavigation 
                onPrevious={handlePreviousLesson}
                onNext={handleNextLesson}
                onComplete={handleCourseComplete}
                isFirstLesson={isFirstLesson}
                isLastLesson={isLastLesson}
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