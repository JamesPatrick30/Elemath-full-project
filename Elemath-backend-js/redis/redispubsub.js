const { createClient } = require("redis");

const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
const subClient = createClient({ url: "redis://127.0.0.1:6379" });

pubClient.on("error", (err) => console.error("Redis Pub Error:", err));
subClient.on("error", (err) => console.error("Redis Sub Error:", err));

async function init() {
  await pubClient.connect();
  await subClient.connect();
  console.log("✅ Redis clients connected");
}

module.exports = { init, pubClient, subClient };
