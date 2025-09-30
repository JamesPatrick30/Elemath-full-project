const pm2 = require("pm2");
const axios = require("axios");
require('dotenv').config();
// const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
// const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const lastNotif = {}; // track per app
const COOLDOWN_MS = 60000; // 1 minute

function canNotify(name, event) {
  if (!lastNotif[name]) {
    lastNotif[name] = { inCooldown: false };
  }

  // Always reset cooldown if app is online
  if (event === "online") {
    lastNotif[name].inCooldown = false;
    return true;
  }

  // If cooldown active, block
  if (lastNotif[name].inCooldown) {
    return false;
  }

  // Enter cooldown
  lastNotif[name].inCooldown = true;
  setTimeout(() => {
    lastNotif[name].inCooldown = false;
  }, COOLDOWN_MS);

  return true;
}

async function sendTelegram(name, event) {
  const message = `🚨 *PM2 Alert*\nApp: ${name}\nEvent: ${event}\nTime: ${new Date().toISOString()}`;
  try {
    const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
	//console.log('chat ID: '+CHAT_ID + ' Tele : '+ TELEGRAM_API);
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
    });
    console.log("Telegram message sent:", res.data);
  } catch (err) {
    console.error("Telegram send error:", err.message);
  }
}

pm2.connect(err => {
  if (err) {
    console.error("PM2 connection error:", err);
    process.exit(2);
  }

  pm2.launchBus((err, bus) => {
    if (err) {
      console.error("PM2 bus error:", err);
      return;
    }

    console.log("✅ PM2 monitor started...");

    bus.on("process:event", async data => {
      const { event, process } = data;
      const name = process.name;

      if (["exit", "restart"].includes(event) && canNotify(name, event)) {
        await sendTelegram(name, event);
      }

      if (event === "online" && canNotify(name, event)) {
        await sendTelegram(name, event);
      }
    });
  });
});
