// import session from "express-session";
// import redis from "redis";
// import connectRedis from "connect-redis";
// const RedisStore = new connectRedis(session);
// const redisClient = redis.createClient("redis://localhost:6379");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["h3-session/nuxt"],
  session: {
    secret: "testSecret",
    resave: true,
    // store: RedisStore({ client: redisClient }),
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 90000 },
  },
  // serverHandlers: [
  //   { route: "/server/**", handler: "~/myapi/index.ts" },
  // ],
});
