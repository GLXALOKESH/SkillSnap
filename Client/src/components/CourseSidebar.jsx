import React from 'react';
import { Link } from 'react-router-dom';

const CourseSidebar = ({ 
  currentModule, 
  currentLesson, 
  currentModuleIndex, 
  currentLessonIndex, 
  totalModules, 
  totalLessonsInModule,
  progressPercentage 
}) => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-[#1a1a1a] border-r border-gray-800 p-6 space-y-8 hidden lg:block">
      <Link 
        to="/course" 
        className="flex items-center text-pink-500 hover:text-pink-400 transition-colors mb-8"
      >
        ← Back to Course Generator
      </Link>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Course Progress</h3>
        <div className="relative pt-1 mb-4">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-500 to-purple-500"
            ></div>
          </div>
        </div>
        <p className="text-sm text-gray-400">
          {progressPercentage}% Complete
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Current Module</h3>
        <p className="text-sm text-gray-400">{currentModule.title}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Current Lesson</h3>
        <p className="text-sm text-pink-400">{currentLesson.title}</p>
      </div>
    </nav>
  );
};

export default CourseSidebar;
