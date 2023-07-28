import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./auth";
import articleRouter from "./articles";

const routers: Record<string, Router> = {
  adminRouter,
  authRouter,
  articleRouter,
};

export default routers;
