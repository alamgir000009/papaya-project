const mongoose = require("mongoose");

const CapabilitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subpoints: [{ type: String }],
});

const CoreCapabilitiesSchema = new mongoose.Schema({
  description: { type: String, required: true },
  capabilities: [CapabilitySchema],
});

module.exports = mongoose.model("CoreCapabilities", CoreCapabilitiesSchema);
