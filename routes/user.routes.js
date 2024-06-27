import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email or password is missing" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or username already exist.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }

    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase, one uppercase letter and a special character.",
      });
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to create user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username || email) || !password) {
      return res
        .status(400)
        .json({ message: "Please provide valid username, email and password" });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(400).json({ message: "No user found, please signup" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    delete user._doc.password;

    const jwtToken = jwt.sign(
      { payload: user },
      process.env.TOKEN_SIGN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "24hrs",
      }
    );

    res.json({ user, authToken: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to log the user in" });
  }
});

router.get("/verify", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ message: "User is logged in", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to verify user" });
  }
});

router.put("/:userId", isAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, fullName, address, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        fullName,
        address,
        profilePic,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Issue updating profile" });
  }
});

export default router;
