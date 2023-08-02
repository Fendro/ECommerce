import adminRouter from "./admin";
import articleRouter from "./articles";
import authRouter from "./auth";
import catRouter from "./categories";
import { Router } from "express";

const routers: Record<string, Router> = {
  adminRouter,
  authRouter,
  articleRouter,
  catRouter,
};

export default routers;
