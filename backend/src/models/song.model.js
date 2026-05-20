import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterurl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true, 
  },
});


const songModel = mongoose.model("songs",songSchema)



export default songModel;