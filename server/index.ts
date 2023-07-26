import bodyParser from "body-parser";
import config from "./src/configs/appConfig";
import express, { Express, Router } from "express";
import routers from "./src/routers";

const app: Express = express();
import cors from "cors";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

app.listen(config.port, config.hostname, () => {
  console.log(`Server is running at '${config.hostname}:${config.port}'.`);
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});

for (const router in routers) {
  app.use("/", routers[router] as Router);
}
