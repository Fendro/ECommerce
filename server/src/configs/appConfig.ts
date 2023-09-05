import * as process from "process";

const env = process.env.DOT_ENV === "production" ? "production" : "development";

const development = {
  env: "development",
  port: 4242,
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
  currencies: {
    updateDelay: 1000 * 60 * 60 * 24,
  },
};

const production = {
  env: "production",
  port: 4242,
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
  currencies: {
    updateDelay: 1000 * 60 * 60 * 24,
  },
};

const appConfig = {
  development,
  production,
};

export default appConfig[env];
