const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  name: { type: String },
  logoUrl: { type: String },
});

module.exports = mongoose.model("logoSection", logoSchema);
