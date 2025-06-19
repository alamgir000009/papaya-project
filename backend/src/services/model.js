const mongoose = require("mongoose");

const SpecializedServiceSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
  },
  services: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
  ],
  mainImage: {
    type: String,
  },
});

module.exports = mongoose.model("Service", SpecializedServiceSchema);
