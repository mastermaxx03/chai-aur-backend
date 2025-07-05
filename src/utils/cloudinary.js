import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //fi;e system in nodejs-read write etc
cloudinary.config({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});
