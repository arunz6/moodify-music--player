import { Router } from "express";
import authcntroller from "../controller/auth.controller.js";
import authuser from "../middleware/auth.middleware.js";
const authrouter = Router();




authrouter.post("/register",authcntroller.register)
authrouter.get("/getme",authuser.authuser,authcntroller.getme)
authrouter.post("/login",authcntroller.login)
authrouter.post("/logout",authcntroller.logout)



export default authrouter;