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
import { log } from "console";


const createCourse = asyncHandler(async (req, res) => {
    //take topic from user 
    //call gemini api to generate course content
    //save lessons to db
    //save course to db
console.log("got request to create course");

    const { topic } = req.body;

    if (!topic) {
        throw new ApiError(400, "All fields are required");
    }
console.log("giving prompt to gemini api", topic);

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
  "structure": "A structured outline of the course with modules and lessons.",
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
`
console.log("starting genarating");

    const response = await callGeminiTextGenAPI(prompt);
    console.log("Gemini API response:", response);
    
    if (!response || !response.text) {
        throw new ApiError(500, "Failed to generate course content");
    }

    // const course = await req.db.Course.create({
    //     title,
    //     description,
    //     category,
    //     price,
    //     level,
    //     createdBy: req.user._id
    // });

    res.status(201).json(new ApiResponce("Course created successfully"));
});


export {
    createCourse,
};