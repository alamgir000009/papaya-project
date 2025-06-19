const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = new mongoose.model("user", UserSchema);
module.exports = model;
