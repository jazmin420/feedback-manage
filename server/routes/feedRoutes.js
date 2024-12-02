import express from "express";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import {
  submitFeedback,
  handleUploadFiles,
} from "../controllers/feedController.js";

const router = express.Router();

//feedback submit
router.post("/submit", jwtMiddleware, handleUploadFiles, submitFeedback);

export default router;
