import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blacklistModel from "../models/blacklist.model.js";

async function register(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newuser = new userModel({
    username,
    email,
    password: hashedPassword,
  });
  const jwtToken = jwt.sign({ id: newuser._id }, process.env.jwt_secret, {
    expiresIn: "3d",
  });
  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  await newuser.save();
  res.status(201).json({
    message: "User registered successfully",
    newuser,
  });
}

async function getme(req, res) {
  const user = await userModel.findById(req.user.id);
 
  res.status(200).json({
    message: "User found",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(402).json({
      message: "Invalid credentials",
    });
  }
  const isMatchpassword = await bcrypt.compare(password, user.password);
  if (!isMatchpassword) {
    return res.status(402).json({
      message: "incorrect password ",
    });
  }

  const jwtToken = jwt.sign({ id: user._id }, config.jwtsecret, {
    expiresIn: "3d",
  });
  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function logout(req, res) {
  const ctoken = req.cookies.token;
  if (!ctoken) {
    return res.status(401).json({
      message: "tokenn is not present ",
    });
  }

  res.clearCookie("token");

  await blacklistModel.create({ token: ctoken });   

  res.status(200).json({
    message: "Logout successful",
  });
}

export default { register, getme, login , logout };
