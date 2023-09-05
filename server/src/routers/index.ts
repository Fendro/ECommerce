import adminRouter from "./admin";
import addressesRouter from "./addresses";
import articlesRouter from "./articles";
import authRouter from "./auth";
import categoriesRouter from "./categories";
import countriesRouter from "./countries";
import creditCardsRouter from "./creditCards";
import currenciesRouter from "./currencies";
import ordersRouter from "./orders";
import { Router } from "express";

const routers: Record<string, Router> = {
  adminRouter,
  addressesRouter,
  authRouter,
  articlesRouter,
  categoriesRouter,
  countriesRouter,
  creditCardsRouter,
  currenciesRouter,
  ordersRouter,
};

export default routers;
