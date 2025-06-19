const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const upload = require("../utils/multureConfig");

router.post(
  "/create",
  authMiddleware(),
  upload.array("logos", 10),
  controller.create
);
router.get("/getAll", authMiddleware(), controller.getAll);
router.get("/getDetails", authMiddleware(), controller.getDetails);
router.get("/getAbout", controller.getAbout);
router.delete("/delete", authMiddleware(), controller.delete);

module.exports = router;
