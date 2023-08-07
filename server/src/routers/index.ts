import adminRouter from "./admin";
import articlesRouter from "./articles";
import authRouter from "./auth";
import categoriesRouter from "./categories";
import ordersRouter from "./orders";
import { Router } from "express";

const routers: Record<string, Router> = {
  adminRouter,
  authRouter,
  articlesRouter,
  categoriesRouter,
  ordersRouter,
};

export default routers;
