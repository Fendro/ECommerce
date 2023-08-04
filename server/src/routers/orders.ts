import { catchWrapper } from "../utils";
import { isLoggedIn } from "../controllers/UserController";
import { Router } from "express";
import * as OrderController from "../controllers/OrderController";

const ordersRouter: Router = Router();

ordersRouter.get(
  "/orders",
  isLoggedIn,
  catchWrapper(OrderController.getOrders),
);
ordersRouter.get(
  "/orders/:_id",
  isLoggedIn,
  catchWrapper(OrderController.getOrder),
);
ordersRouter.post("/orders", catchWrapper(OrderController.addOrder));
ordersRouter.put("/orders/:_id", catchWrapper(OrderController.editOrder));

export default ordersRouter;
