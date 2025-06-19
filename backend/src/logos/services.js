const logoModel = require("./model");

const service = {
  create: async (name, logoUrl) => {
    const newLogo = new logoModel({
      name,
      logoUrl,
    });

    const result = await newLogo.save();
    return result;
  },
  getAll: async () => {
    const result = await logoModel.find();
    return result;
  },
  getDetails: async (Id) => {
    const result = await logoModel.findById(Id);
    return result;
  },
  getAbout: async () => {
    const result = await logoModel.find({});
    return result;
  },
  delete: async (Id) => {
    const result = await logoModel.findOneAndDelete({ _id: Id });
    return result;
  },
};

module.exports = service;
