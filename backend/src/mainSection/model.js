const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mainSectionSchema = new Schema(
  {
    description: {
      type: String,
    },
    heading: {
      type: String,
    },
    logos: [{
      type: String,
    }],
  },
  { timestamps: true }
);

const model = new mongoose.model("mainSection", mainSectionSchema);
module.exports = model;
