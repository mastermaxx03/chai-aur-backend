import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // --- DEBUGGING LOG ---
  // This will show us exactly what data is arriving in the controller
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);
  // --- END DEBUGGING LOG ---

  // Step 1: Get user details from the request body
  const { fullName, username, email, password } = req.body;

  // Step 2: Validate that required fields are not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Step 3: Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Step 4: Handle file uploads
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar to Cloudinary
  const avatar = await uploadOncloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file failed to upload. Please try again.");
  }

  // --- CORRECTED LOGIC FOR OPTIONAL COVER IMAGE ---
  let coverImage;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    const coverImageLocalPath = req.files.coverImage[0].path;
    coverImage = await uploadOncloudinary(coverImageLocalPath);
  }
  // --- END OF CORRECTION ---

  // Step 5: Create user object and save to database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // Use optional chaining here
    email,
    password, // IMPORTANT: Ensure password is being hashed in your user.model.js pre-save hook
    username: username.toLowerCase(),
  });

  // Step 6: Retrieve created user and remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User registration failed, please try again.");
  }

  // Step 7: Return successful response
  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully") // Corrected status code
  );
});

export { registerUser };
