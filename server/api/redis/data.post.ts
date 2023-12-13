import Redis from "ioredis";
export default defineEventHandler(async (event) => {
  const redis = new Redis();

  let cursor: string = "0";
  const keys: string[] = [];
  do {
    const [newCursor, resultKeys] = await redis.scan(
      cursor,
      "MATCH",
      "*",
      "COUNT",
      1000
    );
    cursor = newCursor;
    keys.push(...resultKeys);
  } while (cursor !== "0");

  const result: { id: string; data: string }[] = [];
  for await (const key of keys) {
    result.push({
      id: key,
      data: JSON.parse((await redis.get(key)) ?? ""),
    });
  }
  return result;
});
