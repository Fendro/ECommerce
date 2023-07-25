import { Router } from "express";
import authRouter from "./authentication";
import prodRouter from "./products";

const routers: Record<string, Router> = {
  authRouter,
  prodRouter,
};

export default routers;
