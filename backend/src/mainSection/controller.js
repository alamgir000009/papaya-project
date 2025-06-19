const expressAsyncHandler = require("express-async-handler");
const AppError = require("../helper/apiError");
const services = require("./services");
const { create } = require("./validator");
const path = require("path");

exports.create = expressAsyncHandler(async (req, res, next) => {
  const { description, heading } = req.body;

  // Validate the request body
  // const validate = create.validate(req.body);
  // if (validate.error) {
  //   return next(new AppError(validate.error.details[0].message, 400));
  // }

  // Handle multiple logo files
  let logoPaths = [];
  if (req.files && req.files.length > 0) {
    logoPaths = req.files.map((file) =>
      path.join("mainSectionFiles", file.filename)
    );
  }

  const result = await services.create(description, heading, logoPaths);

  // Respond with success
  res.status(201).json({
    msg: "Record created or updated successfully.",
    data: result,
  });
});

exports.getAll = expressAsyncHandler(async (req, res, next) => {
  const result = await services.getAll();
  res.status(200).json({
    msg: "All records fetched successfully.",
    data: result,
  });
});

exports.getDetails = expressAsyncHandler(async (req, res, next) => {
  const { aboutId } = req.query;
  const result = await services.getDetails(aboutId);
  res.status(200).json({
    msg: "Record fetched successfully.",
    data: result,
  });
});

exports.delete = expressAsyncHandler(async (req, res, next) => {
  const { aboutId } = req.query;
  const result = await services.delete(aboutId);
  res.status(200).json({
    msg: "Record deleted successfully.",
  });
});

exports.getAbout = expressAsyncHandler(async (req, res, next) => {
  const result = await services.getAbout();
  res.status(200).json({
    msg: "Record fetched successfully.",
    data: result,
  });
});
