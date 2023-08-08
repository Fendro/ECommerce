import { catchWrapper } from "../utils";
import { isLoggedIn } from "../controllers/UserController";
import { Router } from "express";
import * as CountryController from "../controllers/CountryController";
import { isAdmin } from "../controllers/AdminController";

const countriesRouter: Router = Router();

countriesRouter.put(
  "/countries/:_id",
  isAdmin,
  catchWrapper(CountryController.deleteCountry),
);
countriesRouter.get(
  "/countries",
  isLoggedIn,
  catchWrapper(CountryController.getCountries),
);
countriesRouter.get(
  "/countries/:_id",
  isLoggedIn,
  catchWrapper(CountryController.getCountry),
);
countriesRouter.post(
  "/countries",
  isAdmin,
  catchWrapper(CountryController.addCountry),
);
countriesRouter.put(
  "/countries/:_id",
  isAdmin,
  catchWrapper(CountryController.editCountry),
);

export default countriesRouter;
