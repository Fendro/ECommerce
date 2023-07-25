require("dotenv").config();
const env = process.env.DOT_ENV === "production" ? "production" : "development";

const development = {
  port: 4242,
  hostname: "localhost",
};

const production = {
  port: 4242,
  hostname: "localhost",
};

const appConfig = {
  development,
  production,
};

export default appConfig[env];
