require("dotenv").config();
const env = process.env.DOT_ENV === "production" ? "production" : "development";

const development = {
  env: "development",
  port: 8484,
  hostname: "localhost",
  users: {
    session: {
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
      },
    },
  },
  rateLimit: {
    max: 100,
    windowMs: 10000,
  },
};

const production = {
  env: "production",
  port: 8484,
  hostname: "localhost",
  users: {
    session: {
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
      },
    },
  },
  rateLimit: {
    max: 10,
    windowMs: 10000,
  },
};

const appConfig = {
  development,
  production,
};

export default appConfig[env];
