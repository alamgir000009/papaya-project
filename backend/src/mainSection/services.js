const MainSection = require("./model");

const service = {
  create: async (description, heading, logos) => {
    const existingRecord = await MainSection.findOne();

    if (existingRecord) {
      return MainSection.findByIdAndUpdate(
        existingRecord._id,
        { description, heading, logos },
        { new: true }
      );
    } else {
      const newRecord = new MainSection({ description, heading, logos });
      return newRecord.save();
    }
  },
  getAll: async () => {
    const result = await MainSection.find();
    return result;
  },
  getDetails: async (aboutId) => {
    const result = await MainSection.findById(aboutId);
    return result;
  },
  getAbout: async () => {
    const result = await MainSection.findOne({});
    return result;
  },
  delete: async (aboutId) => {
    const result = await MainSection.findOneAndDelete({ _id: aboutId });
    return result;
  },
};

module.exports = service;
