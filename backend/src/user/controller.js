const expressAsyncHandler = require("express-async-handler");
const AppError = require("../helper/apiError");
const services = require("./services");
const { registration, login } = require("./validator");

exports.register = expressAsyncHandler(async (req, res,next) => {
  const { name, email, password, role } = req.body;

  const validate = registration.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  const isExistUser = await services.userExist(email);
  // Check if the user already exists
  if (isExistUser) {
    return res.status(400).json({ msg: "email is already in use." });
  }

  const result = await services.register(name, email, password);

  // Respond with success
  res.status(201).json({
    msg: "User registered successfully.",
    user: {
      id: result.id,
      name: result.name,
      email: result.email,
    },
  });
});

exports.login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const validate = login.validate(req.body);
  if (validate.error) {
    return next(new AppError(validate.error, 400));
  }

  try {
    const { access_token, user } = await services.login(email, password);
    res.status(200).json({
      msg: "Login successful",
      access_token,
      user,
    });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});

exports.logout = expressAsyncHandler(async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(400).json({ msg: "No token provided." });
  }

  services.logout(token);

  return res.status(200).json({ msg: "Logout successful." });
});
