import { Router } from "express";
import adminRouter from "./admin";
import authRouter from "./authentication";
import prodRouter from "./product";

const routers: Record<string, Router> = {
  adminRouter,
  authRouter,
  prodRouter,
};

export default routers;
