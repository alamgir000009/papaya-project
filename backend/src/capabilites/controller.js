const expressAsyncHandler = require("express-async-handler");
const AppError = require("../helper/apiError");
const service = require("./services");
const { createSchema } = require("./validator");
const path = require("path");

exports.createOrUpdateCoreCapabilities = async (req, res) => {
  const { title, description, capabilities } = req.body;
  const result = await service.createOrUpdateCoreCapabilities(
    description,
    capabilities
  );

  return res.status(200).json({
    message: "Core Capabilities section saved successfully!",
    data: result,
  });
};

exports.getAll = expressAsyncHandler(async (req, res, next) => {
  const result = await service.getAll();
  res.status(200).json({
    msg: "All records fetched successfully.",
    data: result,
  });
});

exports.getDetails = expressAsyncHandler(async (req, res, next) => {
  const { capabilityId } = req.query;
  const result = await service.getDetails(capabilityId);
  res.status(200).json({
    msg: "Record fetched successfully.",
    data: result,
  });
});

exports.delete = expressAsyncHandler(async (req, res, next) => {
  const { aboutId } = req.query;
  const result = await service.delete(aboutId);
  res.status(200).json({
    msg: "Record deleted successfully.",
  });
});

exports.getAbout = expressAsyncHandler(async (req, res, next) => {
  const result = await service.getAbout();
  res.status(200).json({
    msg: "Record fetched successfully.",
    data: result,
  });
});
