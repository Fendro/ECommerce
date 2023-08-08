import bodyParser from "body-parser";
import config from "./src/configs/appConfig";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Router } from "express";
import rateLimiter from "express-rate-limit";
import routers from "./src/routers";
import session from "express-session";
import { dbInit, logParsedPayloads } from "./src/services";
import { ErrorHandler } from "./src/services";
import { incomingRequest } from "./src/services/";

const app: Express = express();

/*  Setting up database and collections  */
dbInit().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

/*  Mounting request information logger at the beginning of the stack  */
app.use(incomingRequest);

/*  Setting up requests parsers and permissions  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8484"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

/*  Setting up user session manager  */
app.use(cookieParser());
app.use(
  session({
    cookie: {
      maxAge: config.users.session.cookie.maxAge,
      sameSite: true,
      secure: "auto",
    },
    saveUninitialized: true,
    secret: "Ecommerce",
    resave: true,
  }),
);

app.use(logParsedPayloads);

/*  Setting up the rate limiter  */
app.use(
  rateLimiter({
    max: config.rateLimit.max,
    windowMs: config.rateLimit.windowMs,
    message: "You can't make any more requests at the moment. Try again later",
  }),
);

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
