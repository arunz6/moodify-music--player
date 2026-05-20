import dotenv from "dotenv";
dotenv.config();

const config = {
  mongodb: process.env.mongodb,

  jwtsecret: process.env.jwt_secret,

  publicKey: process.env.imagekit_public_key,

  privateKey: process.env.imagekit_private_key,

  urlEndpoint: process.env.imagekit_url_endpoint,
};

export default config;
