import Feedback from "../model/feedbackModel.js";
import { errorHandler } from "../utilities/error.js";
import multer from "multer";
import path from "path";

// Set up file storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
export default upload;

// Handle feedback submission
export const submitFeedback = async (req, res, next) => {
  try {
    const { username, mobileNumber, email, comment, emoji } = req.body;

    if (!username || !mobileNumber || !email || !comment || !emoji) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // console.log(req.body);
    // console.log(req.files);

    //extract path
    const video = req.files["video"]
      ? `/uploads/${req.files["video"][0].filename}`
      : null;
    const image = req.files["image"]
      ? `/uploads/${req.files["image"][0].filename}`
      : null;
    const invoice = req.files["invoice"]
      ? `/uploads/${req.files["invoice"][0].filename}`
      : null;

    // Create feedback entry
    const feedback = new Feedback({
      username,
      mobileNumber,
      email,
      comment,
      emoji,
      video,
      image,
      invoice,
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    next(error);
  }
};

// Middleware for handling file uploads (video, image, invoice)
export const handleUploadFiles = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "invoice", maxCount: 1 },
]);
