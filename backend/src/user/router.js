const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.post("/registerUser", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
