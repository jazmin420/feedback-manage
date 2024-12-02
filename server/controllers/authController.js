import User from "../model/userModel.js";
import { errorHandler } from "../utilities/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

// User sign up
export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "Please add all the fields"));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(errorHandler(400, "User already exists with same email!!!"));
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    const { password, ...rest } = newUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// User sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required!!"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "User not found!!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Password!!"));
    }

    const payload = {
      id: validUser._id,
      email: validUser.email,
      username: validUser.username,
      isAdmin: validUser.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//sign out
export const signout = (req, res, next) => {
  res.clearCookie("access_token", { path: "/", httpOnly: true, secure: false });
  res.status(200).json({ success: true, message: "Signed out successfully!" });
};
