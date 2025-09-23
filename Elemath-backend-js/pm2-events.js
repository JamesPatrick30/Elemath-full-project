const pm2 = require("pm2");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const lastNotif = {}; // track per app
const COOLDOWN_MS = 60000; // 1 minute

function canNotify(name, event) {
  const now = Date.now();

  if (!lastNotif[name]) {
    lastNotif[name] = { lastTime: 0, inCooldown: false };
  }

  // Always reset cooldown if app is online
  if (event === "online") {
    lastNotif[name].inCooldown = false;
    lastNotif[name].lastTime = 0;
    return true;
  }

  // If cooldown active, block
  if (lastNotif[name].inCooldown) {
    return false;
  }

  // First event in a while → notify + enter cooldown
  lastNotif[name].inCooldown = true;
  lastNotif[name].lastTime = now;

  // Reset cooldown after 1 minute
  setTimeout(() => {
    lastNotif[name].inCooldown = false;
  }, COOLDOWN_MS);

  return true;
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

    bus.on("process:event", data => {
      const { event, process } = data;
      const name = process.name;

      if (["exit", "restart"].includes(event) && canNotify(name, event)) {
        // console.log(`❌ Crash/Restart detected: ${name}`);
        try{
            const message = `🚨 *PM2 Alert*
                App: ${name}
                Event: ${event}
                Time: ${new Date().toISOString()}
                `;
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            });
        }catch(e){
            console.log(e);
        }
       
        // send Telegram/Slack/email here
      }

      if (event === "online" && canNotify(name, event)) {
        // console.log(`✅ Back online: ${name}`);
        try{
            const message = `🚨 *PM2 Alert*
                App: ${name}
                Event: ${event}
                Time: ${new Date().toISOString()}
                `;
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            });
        }catch(e){
            console.log(e);
        }
      }
    });
  });
});
