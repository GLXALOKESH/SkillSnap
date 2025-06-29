import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createCourse, fetchallCourses, fetchCourseById } from "../controllers/courses.controller.js";

const router = Router();



router.route("/create").post(verifyToken,createCourse);
router.route("/fetchAll").get(fetchallCourses);
router.route("/course/:courseId").get(fetchCourseById);




export default router;
