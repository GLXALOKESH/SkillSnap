import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createCourse } from "../controllers/courses.controller.js";

const router = Router();



router.route("/create").post(verifyToken, createCourse);



export default router;
