import bodyParser from "body-parser";
import config from "./src/configs/appConfig";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express, Router } from "express";
import routers from "./src/routers";
import session from "express-session";
import { dbInit } from "./src/services";
import { ErrorHandler } from "./src/services";

const app: Express = express();

/*  Setting up database and collections  */
dbInit().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

/*  Setting up requests encoding and permissions  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

/*  Setting up user session manager  */
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: config.users.session.cookie.maxAge },
    saveUninitialized: true,
    secret: "Ecommerce",
    resave: true,
  }),
);

/*  Starting the server  */
app.listen(config.port, config.hostname, () => {
  console.log(
    `Server is running at 'http://${config.hostname}:${config.port}'.`,
  );
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});

/*  Setting routes up  */
for (const router in routers) {
  app.use("/", routers[router] as Router);
}

/*  Setting error handler up at the end of the stack  */
app.use(ErrorHandler);
