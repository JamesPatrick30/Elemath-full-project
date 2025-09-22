const logger = require("../logger");
const notifyTelegram = require("../notifier");
// A helper to log errors consistently
function logError(err, req = null) {
  const context = {};

  if (req) {
    context.method = req.method;
    context.url = req.originalUrl;
    if (req.user) {
      context.userId = req.user.id || "anonymous";
    }
    context.ip = req.ip;
  }

  logger.error(
    {
      ...context,
      stack: err.stack,
      message: err.message,
    },
    "❌ Application Error"
  );
  notifyTelegram(
    {
      ...context,
      stack: err.stack,
      message: err.message,
    },
    "❌ Application Error"
  );
}

module.exports = logError;
