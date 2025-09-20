// logger.js
const pino = require("pino");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: { pid: false }, // cleaner logs
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]'
    ],
    censor: "[REDACTED]" // replace sensitive values
  },
  transport: process.env.NODE_ENV !== "production"
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          singleLine: true
        }
      }
    : undefined,
});

module.exports = logger;
