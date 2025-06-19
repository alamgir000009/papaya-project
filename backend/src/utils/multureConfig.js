const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination:async (req, file, cb) => {
    const targetDirectory = "uploads/mainSectionFiles"; // Define your target directory
    try {
      // Check if the target directory exists
      if (!fs.existsSync(targetDirectory)) {
        // If it doesn't exist, create it
        await fs.promises.mkdir(targetDirectory, { recursive: true });
      }
      cb(null, targetDirectory);
    } catch (err) {
      // Handle any errors during directory creation
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 12 * 1024 * 1024 }, // 5 MB limit per file
});

module.exports = upload;