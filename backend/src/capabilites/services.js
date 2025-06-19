const CoreCapabilities = require("./model");

const service = {
  createOrUpdateCoreCapabilities: async (description, capabilities) => {
    let coreCapabilities = await CoreCapabilities.findOne();
    if (coreCapabilities) {
      // Update existing document
      coreCapabilities.description =
        description || coreCapabilities.description;
      coreCapabilities.capabilities =
        capabilities || coreCapabilities.capabilities;
      await coreCapabilities.save();
    } else {
      // Create new document
      coreCapabilities = new CoreCapabilities({
        description,
        capabilities,
      });
      await coreCapabilities.save();
    }

    return coreCapabilities;
  },
  getAll: async () => {
    const result = await CoreCapabilities.find();
    return result;
  },
  getDetails: async (capabilityId) => {
    const result = await CoreCapabilities.findOne({ _id: capabilityId });
    console.log(result);
    return result;
  },
  getAbout: async () => {
    const result = await CoreCapabilities.findOne({});
    return result;
  },
  delete: async (capabilityId) => {
    const result = await CoreCapabilities.findOneAndDelete({
      _id: capabilityId,
    });
    return result;
  },
};

module.exports = service;
