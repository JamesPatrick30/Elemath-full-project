const logger = require("../logger");
const notifyTelegram = require("../notifiers/errornotifier");
const redisClient = require('../redis/redisClient.js');
// A helper to log errors consistently
async function logError(err, req = null) {
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
  if (err.message.includes("Rate limit exceeded for IP")) {
    const key = `ddos_alert:${context.ip}:${context.path}`;
    const existing = await redisClient.get(key);
    if (existing) {
      // Already alerted recently
      // console.error("DDoS alert already sent recently, skipping...");
      return;
    }
    const data = { timestamp: Date.now() };
    // Send a special alert for potential DDoS
    notifyTelegram(
      {
        ...context,
        stack: err.stack,
        message: err.message,
      },
      `🚨 Security Alert: Possible DDoS Attack Detected 🚨
      
    Source: ${context.ip || "Unknown IP"}
    Endpoint: ${context.path || "Unknown route"}
    Error: ${err.message}

    Please investigate immediately.`
    );
    await redisClient.set(key, JSON.stringify(data), { EX: 120 });
    return;
  }
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
