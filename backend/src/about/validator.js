const Joi = require("joi");

module.exports = {
  create: Joi.object({
    description: Joi.string().max(500).optional().messages({
      "string.base": "Description must be a string.",
      "string.max": "Description cannot exceed 500 characters.",
    }),
    mission: Joi.string().max(300).optional().messages({
      "string.base": "Mission must be a string.",
      "string.max": "Mission cannot exceed 300 characters.",
    }),
    vision: Joi.string().max(300).optional().messages({
      "string.base": "Vision must be a string.",
      "string.max": "Vision cannot exceed 300 characters.",
    }),
  }),
};
