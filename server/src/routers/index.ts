import adminRouter from "./admin";
import articlesRouter from "./articles";
import authRouter from "./auth";
import categoriesRouter from "./categories";
import countriesRouter from "./countries";
import currenciesRouter from "./currencies";
import ordersRouter from "./orders";
import { Router } from "express";

const routers: Record<string, Router> = {
  adminRouter,
  authRouter,
  articlesRouter,
  categoriesRouter,
  countriesRouter,
  currenciesRouter,
  ordersRouter,
};

export default routers;
