// logger.js
const pino = require("pino");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: { pid: false },
  transport: process.env.NODE_ENV !== "production"
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined,
});

module.exports = logger;
