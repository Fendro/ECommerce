require("dotenv").config();
const env = process.env.DOT_ENV === "production" ? "production" : "development";

const development = {
  port: 4242,
  hostname: "localhost",
  users: {
    session: {
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
      },
    },
  },
};

const production = {
  port: 4242,
  hostname: "localhost",
  users: {
    session: {
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
      },
    },
  },
};

const appConfig = {
  development,
  production,
};

export default appConfig[env];
