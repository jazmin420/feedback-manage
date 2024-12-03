import Feedback from "../model/feedbackModel.js";
import { errorHandler } from "../utilities/error.js";
import { fileUploadUtil } from '../cloudinaryConfig.js';
import { upload} from '../cloudinaryConfig.js'


export const handleUploadFiles = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "invoice", maxCount: 1 }
]);


// Handle feedback submission
export const submitFeedback = async (req, res, next) => {
  try {
    const { username, mobileNumber, email, comment, emoji } = req.body;

    if (!username || !mobileNumber || !email || !comment || !emoji) {
      return next(errorHandler(401, "All fields are required."));
    }

    //console.log('Starting file upload...');

     const video = req.files["video"] ? await fileUploadUtil(req.files["video"][0].buffer) : null;
     //console.log('Video uploaded:', video);

     const image = req.files["image"] ? await fileUploadUtil(req.files["image"][0].buffer) : null;
     //console.log('Image uploaded:', image);

     const invoice = req.files["invoice"] ? await fileUploadUtil(req.files["invoice"][0].buffer) : null;
     //console.log('Invoice uploaded:', invoice);

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
