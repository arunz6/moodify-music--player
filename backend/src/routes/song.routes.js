import { Router } from 'express';
import upload from '../middleware/uplode.middleware.js';
import songcontroller from '../controller/song.controller.js';

const songroutes = new Router();

// /api/songs/
songroutes.post("/",upload.single("song"),songcontroller.uplodesong)


export default songroutes;