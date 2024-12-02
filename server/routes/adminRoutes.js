import express from "express";
import {
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} from "../controllers/adminController.js";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";

const router = express.Router();

// fetch all feedback
router.get("/feedbacks", jwtMiddleware, getAllFeedbacks);

// Update feedback approval status
router.put("/feedbacks/:id", jwtMiddleware, updateFeedbackStatus);

// Delete feedback
router.delete("/feedbacks/:id", jwtMiddleware, deleteFeedback);

export default router;
