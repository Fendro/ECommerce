import { catchWrapper } from "../utils";
import { isLoggedIn } from "../controllers/UserController";
import { Router } from "express";
import * as CountryController from "../controllers/CountryController";
import { isAdmin } from "../controllers/AdminController";

const countriesRouter: Router = Router();

countriesRouter.put(
  "/orders/:_id",
  isAdmin,
  catchWrapper(CountryController.deleteCountry),
);
countriesRouter.get(
  "/orders",
  isLoggedIn,
  catchWrapper(CountryController.getCountries),
);
countriesRouter.get(
  "/orders/:_id",
  isLoggedIn,
  catchWrapper(CountryController.getCountry),
);
countriesRouter.post(
  "/orders",
  isAdmin,
  catchWrapper(CountryController.addCountry),
);
countriesRouter.put(
  "/orders/:_id",
  isAdmin,
  catchWrapper(CountryController.editCountry),
);

export default countriesRouter;
