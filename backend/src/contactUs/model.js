const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  contact: { type: String },
  details: { type: String },
});

module.exports = mongoose.model("contactUs", contactUsSchema);
