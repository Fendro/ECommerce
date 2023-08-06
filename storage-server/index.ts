import config from "./src/configs/appConfig";
import cors from "cors";
import express, { Express, Router } from "express";
import rateLimiter from "express-rate-limit";
import routers from "./src/routers";
import { ErrorHandler } from "./src/services";
import { incomingRequest } from "./src/services/";

const app: Express = express();

/*  Mounting request information logger at the beginning of the stack  */
app.use(incomingRequest);

/*  Setting up permissions  */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4242"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

/*  Setting up the rate limiter  */
app.use(
  rateLimiter({
    max: config.rateLimit.max,
    windowMs: config.rateLimit.windowMs,
    message: "You can't make any more requests at the moment. Try again later",
  }),
);

// app.use("/images", express.static(`${__dirname}/images`));

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
