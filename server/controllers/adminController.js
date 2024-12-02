import Feedback from "../model/feedbackModel.js";
import { sendWhatsAppMessage } from "../services/notifyService.js";
import { containsPositiveEmoji } from "../utilities/emojiUtils.js";

//fetch all feedback
export const getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    next(error);
  }
};

// Update feedback approval status
export const updateFeedbackStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "'status' must be 'pending', 'approved', or 'rejected'.",
      });
    }

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    feedback.status = status;
    await feedback.save();

    if (status === "approved" && containsPositiveEmoji(feedback.emoji)) {
      const ownerNumber = "+918590372636";
      const message = `A customer loved your service: "${feedback.comment}${feedback.emoji}" \n *${feedback.username}* `;
      try {
        await sendWhatsAppMessage(ownerNumber, message);
        console.log("WhatsApp notification sent successfully.");
      } catch (err) {
        console.error("Error sending WhatsApp notification:", err);
      }
    }

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    next(error);
  }
};

// Delete feedback
export const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json({ message: "Feedback deleted successfully." });
  } catch (error) {
    next(error);
  }
};
