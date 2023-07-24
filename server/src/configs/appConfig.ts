const env = "production";

const development = {
  port: "4242",
  hostname: "localhost",
};

const production = {
  port: "4242",
  hostname: "localhost",
};

const appConfig = {
  development,
  production,
};

module.exports = appConfig[env];
