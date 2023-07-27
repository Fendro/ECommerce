import bodyParser from "body-parser";
import config from "./src/configs/appConfig";
import cors from "cors";
import express, { Express, Router, Request, Response } from "express";
import routers from "./src/routers";
import session from "express-session";

const app: Express = express();
const userSession = session();

/*  Setting up requests encoding and permissions  */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

// app.use(
//   userSession({
//     secret: "Your_Secret_Key",
//     resave: true,
//     saveUninitialized: true,
//   }),
// );
/*  Starting the server  */
app.listen(config.port, config.hostname, () => {
  console.log(`Server is running at '${config.hostname}:${config.port}'.`);
});

app.on("error", (error) => {
  console.log("Failed to start the server.", error);
});

/*  Setting routes up  */
for (const router in routers) {
  app.use("/", routers[router] as Router);
}
