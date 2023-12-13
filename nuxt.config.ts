export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["h3-session/nuxt"],
  session: {
    secret: "testSecret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 900000 },
  },
});
