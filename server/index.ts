import express, { Express } from "express";

const configs = require("./src/configs/appConfig");
const app: Express = express();

app.listen(configs.port, configs.hostname, () => {
  console.log(`Server is running at '${configs.hostname}:${configs.port}'.`);
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});
