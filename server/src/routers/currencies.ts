import { catchWrapper } from "../utils";
import { isAdmin } from "../controllers/AdminController";
import { Router } from "express";
import * as CurrencyController from "../controllers/CurrencyController";

const currenciesRouter: Router = Router();

currenciesRouter.delete(
  "/currencies/:name",
  isAdmin,
  catchWrapper(CurrencyController.deleteCurrency),
);
currenciesRouter.get(
  "/currencies",
  catchWrapper(CurrencyController.getCurrencies),
);
currenciesRouter.get(
  "/currencies/:name",
  catchWrapper(CurrencyController.getCurrency),
);
currenciesRouter.post(
  "/currencies/",
  isAdmin,
  catchWrapper(CurrencyController.addCurrency),
);
currenciesRouter.put(
  "/currencies/:name",
  isAdmin,
  catchWrapper(CurrencyController.editCurrency),
);

export default currenciesRouter;
