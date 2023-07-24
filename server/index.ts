import express, { Express } from "express";

const config = require("./src/configs/appConfig");
const app: Express = express();
const router = require("/src/routers/index.ts");

app.listen(config.port, config.hostname, () => {
  console.log(`Server is running at '${config.hostname}:${config.port}'.`);
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});

app.use("/", router);
