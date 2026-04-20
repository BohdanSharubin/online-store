const Joi = require("joi");

const baseSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

exports.loginUserSchema = Joi.object({
  ...baseSchema,
});

exports.registerUserSchema = Joi.object({
  ...baseSchema,
  name: Joi.string().trim().required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
  role: Joi.string()
    .trim()
    .valid("admin", "user")
    .optional()
    .messages({ "any.only": "Role is not valid" }),
});
