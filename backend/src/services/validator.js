const Joi = require("joi");

exports.createSchema = Joi.object({
  sectionTitle: Joi.string().required().messages({
    "string.empty": "Section title is required.",
  }),
  services: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required().messages({
          "string.empty": "Service title is required.",
        }),
        description: Joi.string().required().messages({
          "string.empty": "Service description is required.",
        }),
        icon: Joi.string().optional().messages({
          "string.empty": "Icon should be a string.",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Services must be an array.",
    }),
  mainImage: Joi.string().optional().messages({
    "string.empty": "Main image is required.",
  }),
});
