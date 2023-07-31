import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./auth";
import articleRouter from "./articles";
import catRouter from "./categories";

const routers: Record<string, Router> = {
  adminRouter,
  authRouter,
  articleRouter,
  catRouter,
};

export default routers;
