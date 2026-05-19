const Joi = require("joi");

exports.createReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.min": "Rating have to be greater than 1",
    "number.max": "Rating have to be lower than 5",
    "any.required": "Rating is required",
  }),
  comment: Joi.string().min(10).max(500).required().messages({
    "string.min": "Comment must be at least 10 characters",
    "any.required": "Comment is required",
  }),
})
  .required()
  .messages({
    "object.base": "Body must be an object",
    "any.required": "Request body is required",
  });
