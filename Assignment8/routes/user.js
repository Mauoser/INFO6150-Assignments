const Joi = require("joi");

const createSchema = Joi.object({
  fullName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .required(),
});

const updateSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .optional(),
  password: Joi.string()
    .min(8)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[\W_]/)
    .optional(),
});
