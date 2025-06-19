const Joi = require("joi");

exports.create = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "string.empty": "Email cannot be empty.",
  }),
  contact: Joi.string()
    .pattern(/^\+\d+$/)
    .required()
    .messages({
      "string.empty": "Contact cannot be empty.",
      "string.pattern.base":
        "Contact must start with '+' and contain only numbers.",
    }),
  details: Joi.string().required().messages({
    "string.empty": "Details cannot be empty.",
  }),
});
