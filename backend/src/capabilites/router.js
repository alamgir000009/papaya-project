const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const controller = require("./controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post(
  "/create",
  authMiddleware(),
  controller.createOrUpdateCoreCapabilities
);
router.get("/getAll", authMiddleware(), controller.getAll);
router.get("/getDetails", authMiddleware(), controller.getDetails);
router.get("/getAbout", controller.getAbout);
router.delete("/delete", authMiddleware(), controller.delete);

module.exports = router;
