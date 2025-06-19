const expressAsyncHandler = require("express-async-handler");
const AppError = require("../helper/apiError");
const service = require("./services");
const { createSchema } = require("./validator");
const path = require("path");

exports.createOrUpdate = expressAsyncHandler(async (req, res, next) => {
  const { sectionTitle, services: rawServices } = req.body;

  console.log("Request body:", req.body);

  // Initialize services array from rawServices
  const services = Array.isArray(rawServices) ? rawServices : [];

  // Attach uploaded files to the corresponding service objects
  req.files.forEach((file) => {
    const match = file.fieldname.match(/services\[(\d+)]\[icon]/); // Match fieldname pattern for files
    if (match) {
      const index = parseInt(match[1], 10); // Extract the index
      if (services[index]) {
        services[index].icon = file.path; // Attach the file path to the icon field
      }
    }
  });

  console.log("Services after attaching files:", services);

  // Handle the main image
  const mainImageFile = req.files.find(
    (file) => file.fieldname === "mainImage"
  );

  // Build the data object to save
  const data = {
    sectionTitle,
    mainImage: mainImageFile ? mainImageFile.path : null,
    services,
  };

  console.log("Data to save:", data);

  // Simulate database save (or replace with actual DB logic)
  const result = await service.create(data);

  return res.status(200).json({
    msg: "Successful.",
    data: result,
  });
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
