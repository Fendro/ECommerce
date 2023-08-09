import bodyParser from "body-parser";
import config from "./src/configs/appConfig";
import cors from "cors";
import express, { Express, Router } from "express";
import rateLimiter from "express-rate-limit";
import routers from "./src/routers";
import {
  incomingRequest,
  logParsedPayloads,
  ErrorHandler,
} from "./src/services/";

const app: Express = express();

/*  Mounting request information logger at the beginning of the stack  */
app.use(incomingRequest);

/*  Setting up requests parsers and permissions  */
app.use(bodyParser.json());

if (config.env === "development") {
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
      credentials: true,
    }),
  );
}

/*  Logging payloads after necessary middlewares have been set  */
app.use(logParsedPayloads);

/*  Setting up the rate limiter  */
app.use(
  rateLimiter({
    max: config.rateLimit.max,
    windowMs: config.rateLimit.windowMs,
    message: "You can't make any more requests at the moment. Try again later",
  }),
);

/*  Setting content delivery routes up  */
app.use("/images", express.static(`${__dirname}/images`));

/*  Setting routes up  */
for (const router in routers) {
  app.use("/", routers[router] as Router);
}

/*  Setting error handler up at the end of the stack  */
app.use(ErrorHandler);

/*  Starting the server  */
app.listen(config.port, config.hostname, () => {
  console.log(
    `Server is running at 'http://${config.hostname}:${config.port}'.`,
  );
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});
