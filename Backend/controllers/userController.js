import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDb } from "../models/userModel.js";

// const router = express.Router()

// Register Route
export const Register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }

    const existingUser = await UserDb.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserDb({ fullname, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Login Route
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const user = await UserDb.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ msg:"Login Successfully",
        token,
        user: { id: user._id, fullname: user.fullname, email: user.email },
      });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// export default router
