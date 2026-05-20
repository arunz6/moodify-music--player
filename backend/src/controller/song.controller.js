import songModel from "../models/song.model.js";
import id3 from "node-id3";



async function uplodesong(req,res){
  const tags = id3.read(req.file.buffer);
  console.log(tags);
 
  res.status(200).json({tags});
}





export default {uplodesong};