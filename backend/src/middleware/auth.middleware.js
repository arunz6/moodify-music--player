import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blacklistModel from "../models/blacklist.model.js";

async function authuser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not found ",
    });
  }

  const blacklistedToken = await blacklistModel.findOne({ token });
  if (blacklistedToken) {
    return res.status(401).json({
      message: "token is blacklisted",
    });
  }
  try {
    const decoded = jwt.verify(token, config.jwtsecret);
    req.user = decoded
    next();
  } catch (err) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
}



export default {authuser};
