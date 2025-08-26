// redisClient.js
const redis = require('redis');

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD || null;

const client = redis.createClient({
  url: `redis://${redisPassword ? `:${redisPassword}@` : ''}${redisHost}:${redisPort}`
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('✅ Connected to Redis');
});

// Connect when app starts
(async () => {
  await client.connect();
})();

module.exports = client;
