export default {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  logging: {
    level: process.env.NODE_ENV === "test" ? "silent" : "info",
  },
};
