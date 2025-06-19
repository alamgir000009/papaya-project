const SpecializedService = require("./model");

const service = {
  create: async (data) => {
    const sectionTitle = data.sectionTitle;
    const services = data.services;
    const mainImage = data.mainImage;
    const existingDocument = await SpecializedService.findOne();
    let Doc;

    if (existingDocument) {
      // Update the existing document
      existingDocument.sectionTitle =
        sectionTitle || existingDocument.sectionTitle;
      existingDocument.services = services || existingDocument.services;
      existingDocument.mainImage = mainImage || existingDocument.mainImage;
      Doc = await existingDocument.save();
    } else {
      // Create a new document if none exists
      Doc = await SpecializedService.create({
        sectionTitle,
        services,
        mainImage,
      });
    }
  },
  getAll: async () => {
    const result = await SpecializedService.find();
    return result;
  },
  getDetails: async (aboutId) => {
    const result = await SpecializedService.findById(aboutId);
    return result;
  },
  getAbout: async () => {
    const result = await SpecializedService.findOne({});
    return result;
  },
  delete: async (serviceId) => {

    const mongoose = require("mongoose");
    
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      throw new Error("Invalid serviceId provided.");
    }

    const result = await SpecializedService.findOneAndUpdate(
      { "services._id": new mongoose.Types.ObjectId(serviceId) },
      { $pull: { services: { _id: new mongoose.Types.ObjectId(serviceId) } } },
      { new: true }
    );

    if (!result) {
      throw new Error("Service not found or already deleted.");
    }

    return result;
  }
};

module.exports = service;
