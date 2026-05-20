import dotenv from "dotenv";
dotenv.config();


const config = {
  mongodb: process.env.mongodb,
  jwtsecret: process.env.jwt_secret
}

export default config;