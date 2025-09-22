const axios = require("axios");
const logger = require("./logger");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function notifyTelegram(errorData, title = "🚨 Application Error") {
  try {
    // Extract first stack frame (line/column)
    let location = "unknown";
    if (errorData.stack) {
      const firstLine = errorData.stack.split("\n")[1] || "";
      location = firstLine.trim(); // e.g. at server.js:319:15
    }

    const message = `
${title}

📝 *Message:* \`${errorData.message}\`
🔗 *Endpoint:* \`${errorData.method || "N/A"} ${errorData.url || "N/A"}\`
👤 *User:* \`${errorData.userId || "anonymous"}\`
🌐 *IP:* \`${errorData.ip || "unknown"}\`

📍 *Location:* \`${location}\`
    `.trim();

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });

    // console.log("✅ Error sent to Telegram");
  } catch (err) {
    logger.error("❌ Telegram notification failed", {
      error: err.message,
    });
    // console.error("❌ Telegram error:", err.response?.data || err.message);
  }
}

module.exports = notifyTelegram;
