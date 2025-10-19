const axios = require("axios");
const logger = require("../logger");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const CHAT_ID = process.env.TELE_LOGING;

async function notifyTelegram(who,role){
    try {
        const message = `
🚨 *Log Notification*
👤 *User:* \`${who || "anonymous"}\`
👔 *Role:* \`${role || "unknown"}\`
        `.trim();

        axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
        });
    } catch (err) {
        logger.error("❌ Telegram notification failed", {
            error: err.message,
        });
    }
}
module.exports = notifyTelegram;