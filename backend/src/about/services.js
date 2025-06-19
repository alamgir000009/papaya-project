const aboutModel = require("./model");

const service = {
  create: async (description, mission, vision) => {
    // Prepare the update object
    const updateData = {};
    if (description) updateData.description = description;
    if (mission) updateData.mission = mission;
    if (vision) updateData.vision = vision;

    // Find the existing record and update, or create a new one if not found
    const result = await aboutModel.findOneAndUpdate(
      {},
      { $set: updateData },
      { upsert: true, new: true }
    );
    return result;
  },
  getAll: async () => {
    const result = await aboutModel.find();
    return result;
  },
  getDetails: async (aboutId) => {
    const result = await aboutModel.findById(aboutId);
    return result;
  },
  getAbout: async () => {
    const result = await aboutModel.findOne({});
    return result;
  },
  delete: async (aboutId) => {
    const result = await aboutModel.findOneAndDelete({_id:aboutId});
    return result;
  },
};

module.exports = service;
