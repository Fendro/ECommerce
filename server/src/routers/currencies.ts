import { catchWrapper } from "../utils";
import { isAdmin } from "../controllers/AdminController";
import { Router } from "express";
import * as CurrencyController from "../controllers/CurrencyController";

const currenciesRouter: Router = Router();

currenciesRouter.delete(
  "/categories/:_id",
  isAdmin,
  catchWrapper(CurrencyController.deleteCurrency),
);
currenciesRouter.get(
  "/categories",
  catchWrapper(CurrencyController.getCurrencies),
);
currenciesRouter.get(
  "/categories/:_id",
  catchWrapper(CurrencyController.getCurrency),
);
currenciesRouter.post(
  "/categories/",
  isAdmin,
  catchWrapper(CurrencyController.addCurrency),
);
currenciesRouter.put(
  "/categories/:_id",
  isAdmin,
  catchWrapper(CurrencyController.editCurrency),
);

export default currenciesRouter;
