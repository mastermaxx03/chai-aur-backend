import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// --- This is a more robust way to handle paths in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This now points to an absolute path, which is more reliable
    const uploadPath = path.join(__dirname, "../../public/temp");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
