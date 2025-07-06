import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// This is the correct, secure configuration that reads from your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOncloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary file
    return response;
  } catch (error) {
    // This will now only run if there's a real upload error,
    // like an invalid file type, not a config error.
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOncloudinary };
