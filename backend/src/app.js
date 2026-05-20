import express from "express"
import cookieParser from "cookie-parser";
import authrouter from "./routes/auth.routes.js"
import cors from "cors";
import songroutes from "./routes/song.routes.js"
import multer from "multer";



const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authrouter);
app.use("/api/songs", songroutes);




export default  app