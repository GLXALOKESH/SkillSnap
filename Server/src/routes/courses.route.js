import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createCourse, fetchallCourses } from "../controllers/courses.controller.js";

const router = Router();



router.route("/create").post(verifyToken,createCourse);
router.route("/fetchAll").get(fetchallCourses);




export default router;
