const winston = require("winston");

const isProduction = process.env.NODE_ENV === "production";

const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...metadata }) => {
    const metaStr = Object.keys(metadata).length
      ? JSON.stringify(metadata)
      : "";
    return `[${timestamp}] ${level}: ${message} ${metaStr}`;
  }),
);

const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: isProduction ? prodFormat : devFormat,
  transports: [new winston.transports.Console()],
});

module.exports = logger;
