const AppError = require("../errors/AppError");

module.exports = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        error: detail.message.replace(/"/g, ""),
      }));
      return next(AppError.badRequest("Data is not valid", errors));
    }
    if (!req.validated) req.validated = {};
    req.validated[property] = value;
    next();
  };
};
