const Joi = require("joi");

exports.createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().max(300).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().trim().required(),
  stock: Joi.number().min(0).required(),
});

exports.updateProductSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().max(300),
  price: Joi.number().min(0),
  category: Joi.string().trim(),
  stock: Joi.number().min(0),
}).min(1);

exports.idSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ "string.pattern.base": "Not valid objectId" }),
});

exports.paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  category: Joi.string().optional(),
});
