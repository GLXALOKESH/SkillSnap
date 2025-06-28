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


const createCourse = asyncHandler(async (req, res) => {
    //take topic from user 
    //call gemini api to generate course content
    //save lessons to db
    //save course to db

    const { topic } = req.body;

    if (!topic) {
        throw new ApiError(400, "All fields are required");
    }

    prompt = ``

    // const course = await req.db.Course.create({
    //     title,
    //     description,
    //     category,
    //     price,
    //     level,
    //     createdBy: req.user._id
    // });

    res.status(201).json(new ApiResponce("Course created successfully", course));
});


export {
    createCourse,
};