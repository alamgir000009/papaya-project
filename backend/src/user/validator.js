const Joi = require("joi");

module.exports = {
  registration: Joi.object({
    name: Joi.string().max(50).required().messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required.",
    }),
    email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
    password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
      "any.required": "Password is required.",
    }),
    // role: Joi.string()
    //   .valid("user", "admin", "super-admin")
    //   .required()
    //   .messages({
    //     "any.only": "You must select your role.",
    //     "string.empty": "Role is required.",
    //     "any.required": "Role is required.",
    //   }),
  }),
  login: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "email must be a string.",
      "string.empty": "email is required.",
      "any.required": "email is required.",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
  }),
};
