import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { createQuiz, FetchQuiz,FtechQuestions } from "../controllers/quiz.controller.js";

const router = Router();

router.route("/create").post(verifyToken, createQuiz);
router.route("/fetch").post(verifyToken, FetchQuiz);
router.route("/questions").post(verifyToken, FtechQuestions);

export default router;
