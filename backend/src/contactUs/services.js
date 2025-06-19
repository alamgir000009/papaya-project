const contactModel = require("./model");

const service = {
  create: async (name, email, contact, details) => {
    const contactDetails = new contactModel({
      name,
      email,
      contact,
      details,
    });

    const result = await contactDetails.save();
    return result;
  },
  getAll: async () => {
    const result = await contactModel.find();
    return result;
  },
  getDetails: async (Id) => {
    const result = await contactModel.findById(Id);
    return result;
  },
  getAbout: async () => {
    const result = await contactModel.find({});
    return result;
  },
  delete: async (Id) => {
    const result = await contactModel.findOneAndDelete({ _id: Id });
    return result;
  },
};

module.exports = service;
