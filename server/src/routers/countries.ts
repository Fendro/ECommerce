import { catchWrapper } from "../utils";
import { Router } from "express";
import * as CountryController from "../controllers/CountryController";
import { isAdmin } from "../controllers/AdminController";

const countriesRouter: Router = Router();

countriesRouter.delete(
  "/countries/:name",
  isAdmin,
  catchWrapper(CountryController.deleteCountry),
);
countriesRouter.get("/countries", catchWrapper(CountryController.getCountries));
countriesRouter.get(
  "/countries/:name",
  catchWrapper(CountryController.getCountry),
);
countriesRouter.post(
  "/countries",
  isAdmin,
  catchWrapper(CountryController.addCountry),
);
countriesRouter.put(
  "/countries/:name",
  isAdmin,
  catchWrapper(CountryController.editCountry),
);

export default countriesRouter;
