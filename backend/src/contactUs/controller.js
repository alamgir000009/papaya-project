const expressAsyncHandler = require("express-async-handler");
const AppError = require("../helper/apiError");
const service = require("./services");
const { create } = require("./validator");
const path = require("path");

exports.create = expressAsyncHandler(async (req, res, next) => {
  const { name, email, contact, details } = req.body;

  // Validate the request body
  const validate = create.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error.details[0].message, 400));
  }

  const result = await service.create(name, email, contact, details);
  res.status(201).json({ success: true, message: "successfull", data: result });
});

exports.getAll = expressAsyncHandler(async (req, res, next) => {
  const result = await service.getAll();
  res.status(200).json({
    msg: "All records fetched successfully.",
    data: result,
  });
});

exports.getDetails = expressAsyncHandler(async (req, res, next) => {
  const { aboutId } = req.query;
  const result = await service.getDetails(aboutId);
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
