import multer from "multer";

// Configure disk storage - this is the middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); not necessary rn
    cb(null, file.originalname);
  },
});

// Initialize multer with the storage configuration
export const upload = multer({ storage });
