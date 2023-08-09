import { catchWrapper } from "../utils";
import { isAdmin } from "../controllers/AdminController";
import { Router } from "express";
import * as CurrencyController from "../controllers/CurrencyController";

const currenciesRouter: Router = Router();

currenciesRouter.delete(
  "/currencies/:_id",
  isAdmin,
  catchWrapper(CurrencyController.deleteCurrency),
);
currenciesRouter.get(
  "/currencies",
  catchWrapper(CurrencyController.getCurrencies),
);
currenciesRouter.get(
  "/currencies/:_id",
  catchWrapper(CurrencyController.getCurrency),
);
currenciesRouter.post(
  "/currencies/",
  isAdmin,
  catchWrapper(CurrencyController.addCurrency),
);
currenciesRouter.put(
  "/currencies/:_id",
  isAdmin,
  catchWrapper(CurrencyController.editCurrency),
);

export default currenciesRouter;
