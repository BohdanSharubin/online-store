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
