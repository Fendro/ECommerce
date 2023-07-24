const env = "production";

const development = {
  port: 27017,
  hostname: "localhost",
  dbName: "Ecommerce",
};

const production = {
  port: 27017,
  hostname: "localhost",
  dbName: "Ecommerce",
};

const config = {
  development,
  production,
};

module.exports = config[env];
