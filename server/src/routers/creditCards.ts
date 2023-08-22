import { catchWrapper } from "../utils";
import { isOwner } from "../controllers/UserController";
import { Router } from "express";
import * as CreditCardController from "../controllers/CreditCardController";

const creditCardsRouter: Router = Router();

creditCardsRouter.delete(
  "/creditCards/:user_id/:_id",
  isOwner,
  catchWrapper(CreditCardController.deleteCreditCard),
);
creditCardsRouter.get(
  "/creditCards/:user_id",
  isOwner,
  catchWrapper(CreditCardController.getCreditCards),
);
creditCardsRouter.get(
  "/creditCards/:user_id/:_id",
  isOwner,
  catchWrapper(CreditCardController.getCreditCard),
);
creditCardsRouter.post(
  "/creditCards/:user_id",
  isOwner,
  catchWrapper(CreditCardController.addCreditCard),
);
creditCardsRouter.put(
  "/creditCards/:user_id/:_id",
  isOwner,
  catchWrapper(CreditCardController.editCreditCard),
);

export default creditCardsRouter;
