import mongoose from "mongoose";
import config from "./config.js";

async function connecttodb(){
  mongoose.connect(config.mongodb)
  .then(()=>{
    console.log("connected to database successfully")
  })
  .catch((err)=>{
    console.log("error in connecting to database",err)
  })
}


export default connecttodb;