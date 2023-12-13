import Redis from "ioredis";
export default defineEventHandler(async (event) => {
  const redis = new Redis();
  await redis.flushdb();
});
