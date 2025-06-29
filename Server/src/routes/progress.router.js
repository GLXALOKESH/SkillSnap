import express from 'express';
import {
  initializeProgress,
  getCourseProgress,
  completeLesson,
  updateCurrentLesson,
  getAllUserProgress,
  resetCourseProgress,
  getUserStats,
  canAccessLesson
} from '../controllers/progress.controller.js';

const router = express.Router();

// Initialize or get progress for a course
router.post('/initialize/:courseId', initializeProgress);

// Get progress for a specific course
router.post('/:courseId', getCourseProgress);

// Mark a lesson as completed
router.post('/:courseId/lesson/:lessonId/complete', completeLesson);

// Update current lesson
router.post('/:courseId/lesson/:lessonId/current', updateCurrentLesson);

// Get all progress for the user
router.post('/', getAllUserProgress);

// Reset course progress
router.post('/:courseId/reset', resetCourseProgress);

// Get user statistics
router.post('/stats/user', getUserStats);

// Check if user can access a lesson
router.post('/:courseId/lesson/:lessonId/can-access', canAccessLesson);

export default router;
