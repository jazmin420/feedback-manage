import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mobileNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    comment: { type: String, required: true },
    emoji: { type: String, required: true },
    video: { type: String },
    image: { type: String },
    invoice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
