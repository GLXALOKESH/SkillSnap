import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { uploadOnCloudinary, deleteFromCloudinary , extractPublicId ,downloadFromCloudinary,extractFilenameFromUrl} from "../utils/cloudinary.js";
import { countwords, extractTextFromFile, safeJsonParseFromGemini } from "../utils/functions.js";
import fs from "fs";
import { callGeminiTextGenAPI } from "../utils/gemini.js";
import { fileURLToPath } from 'url';
import JSON5 from "json5";
import Course from "../models/course.models.js";
import Lesson from "../models/lesson.model.js";
import Module from "../models/modules.model.js";
import Quiz from "../models/quiz.model.js";
import { log } from "console";


const createCourse = asyncHandler(async (req, res) => {
  const { topic } = req.body;
  const userId = req.user._id;

  if (!topic) throw new ApiError(400, "All fields are required");

  const  prompt = `You are an expert course designer and AI tutor. Generate a complete micro-course based on the following user input:

Topic: "${topic}"

Instructions:
1. Create a course title and short description (2–3 lines).
2. create a structured course outline with modules and lessons.
3. Break the course into  modules.
4. Each module should have at least 3 to 4  lessons.
5. For each lesson, include:
   - A title
   - A clear explanation (300 - 400 words)
   - 4 to 5 multiple-choice quiz questions at the end (each with 4 options and the correct answer index)
6. explaination of lessons and course outline should be in format of markdown.

Output the course in structured JSON format like this:

\`\`\`json
{
  "title": "Course Title",
  "description": "Short course description.",
  "modules": [
    {
      "title": "Module 1 Title",
      "lessons": [
        {
          "title": "Lesson 1 Title",
          "content": "Lesson explanation here.",
          "quiz": [
            {
              "question": "Question 1 text?",
              "options": ["A", "B", "C", "D"],
              "answerIndex": 2
            },
            {
              "question": "Question 2 text?",
              "options": ["A", "B", "C", "D"],
              "answerIndex": 0
            }
              ...
          ]
        }
        // More lessons...
      ]
    }
    // More modules...
  ]
}
`;

  const response = await callGeminiTextGenAPI(prompt);
  const data = safeJsonParseFromGemini(response);

  if (!data || !data.modules || !data.modules.length) {
    throw new ApiError(500, "Gemini did not return course modules");
  }

  const course = new Course({
    title: data.title,
    topic,
    description: data.description,
    creator: userId,
    generatedByAI: true
  });
  await course.save();

  const allLessonIds = [];

  for (const moduleData of data.modules) {
    const lessonIds = [];

    for (const lesson of moduleData.lessons) {
      const newLesson = new Lesson({
        course: course._id,
        title: lesson.title,
        content: lesson.content
      });

      const quiz = new Quiz({
        lesson: newLesson._id,
        questions: lesson.quiz.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.answerIndex
        }))
      });
      await quiz.save();

      newLesson.quiz = quiz._id;
      await newLesson.save();

      lessonIds.push(newLesson._id);
      allLessonIds.push(newLesson._id);
    }

    const module = new Module({
      course: course._id,
      title: moduleData.title,
      lessons: lessonIds
    });
    await module.save();
  }

  course.lessons = allLessonIds;
  await course.save();

  res.status(201).json(new ApiResponce("Course created successfully", course));
});


const fetchallCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate("creator", "name email username").sort
({ createdAt: -1 });
  if (!courses || courses.length === 0) {
    throw new ApiError(404, "No courses found");
  }

  res.status(200).json(new ApiResponce("Courses fetched successfully", courses));
} );

const fetchCourseById = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate({
        path: 'lessons',
        populate: {
            path: 'quiz',
            model: 'Quiz'
        }
    });

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    res.status(200).json(new ApiResponce("Course fetched successfully", course));
});

const fetchCourseStructure = asyncHandler(async (req, res) => {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    const modules = await Module.find({ course: courseId }).populate('lessons', 'title');

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    res.status(200).json(new ApiResponce("Course structure fetched successfully", {course:course, modules:modules}));
});

export {
    createCourse,
    fetchallCourses,
    fetchCourseById,
    fetchCourseStructure
};
