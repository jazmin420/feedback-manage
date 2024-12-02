import express from "express";
import jwtMiddleware from "../middlewares/jwtMiddleware.js";
import { signin, signout, signUp } from "../controllers/authController.js";

const router = express.Router();

// auth routes
// User signup
router.post("/signup", signUp);

// User signin
router.post("/signin", signin);

//sign out
router.post("/signout", signout);

router.get("/admin/dashboard", jwtMiddleware, (req, res) => {
  // Check if the user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  res.status(200).json({ message: "Welcome to the admin dashboard!" });
});

export default router;
