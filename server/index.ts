import config from "./src/configs/appConfig";
import express, { Express } from "express";
import router from "./src/routers/router.ts";

const app: Express = express();

app.listen(parseInt(config.port), config.hostname, () => {
  console.log(`Server is running at '${config.hostname}:${config.port}'.`);
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});

app.use("/", router);
