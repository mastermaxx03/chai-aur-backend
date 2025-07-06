import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //fi;e system in nodejs-read write etc
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload file on cloodinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //to automatically detect the file type
    });
    console.log("File uploaded successfully to Cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //delete the locally saved file if upload fails
    return null;
  }
};
export { uploadOncloudinary };
