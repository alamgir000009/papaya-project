const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aboutSchema = new Schema(
  {
    description: {
      type: String,
    },
    mission: {
      type: String,
    },
    vision: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = new mongoose.model("about", aboutSchema);
module.exports = model;
