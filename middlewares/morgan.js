const morgan = require("morgan");
const logger = require("../utils/logger");

const stream = {
  write: (message) => logger.info(message.trim()),
};

const morganFormat =
  process.env.NODE_ENV === "production"
    ? ":method :url :status :res[content-length] - :response-time ms"
    : "dev";

const morganMiddleware = morgan(morganFormat, { stream });

module.exports = morganMiddleware;
