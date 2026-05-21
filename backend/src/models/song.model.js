import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterurl: {
    type: String,
   
  },
  title: {
    type: String,
    required: true, 
  },
  mood:{
    type: String,
    Enum: ["happy", "sad", "surprise"],
    required: true,
  }
});


const songModel = mongoose.model("songs",songSchema)



export default songModel;