const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const controller = require("./controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");
// const upload = require("../utils/multureConfig");

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const targetDirectory = "uploads/ServicesSectionFiles"; // Define your upload directory
    try {
      console.log("targetDirectory", targetDirectory);
      // Create the directory if it doesn't exist
      if (!fs.existsSync(targetDirectory)) {
        await fs.promises.mkdir(targetDirectory, { recursive: true });
      }
      cb(null, targetDirectory);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .jpg, or .png files are allowed"), false);
    }
  },
});

router.post(
  "/create",
  authMiddleware(),
  upload.any(),
  controller.createOrUpdate
);
router.get("/getAll", authMiddleware(), controller.getAll);
router.get("/getDetails", authMiddleware(), controller.getDetails);
router.get("/getAbout", controller.getAbout);
router.delete("/delete", authMiddleware(), controller.delete);

module.exports = router;
