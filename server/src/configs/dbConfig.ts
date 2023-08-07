require("dotenv").config();
const env = process.env.DOT_ENV === "production" ? "production" : "development";

const development = {
  port: 27017,
  hostname: "localhost",
  dbName: "Ecommerce",
  collections: [
    "articles",
    "categories",
    "guests",
    "orders",
    "packages",
    "users",
  ],
};

const production = {
  port: 27017,
  hostname: "localhost",
  dbName: "Ecommerce",
  collections: [
    "articles",
    "categories",
    "guests",
    "orders",
    "packages",
    "users",
  ],
};

const config = {
  development,
  production,
};

export default config[env];
