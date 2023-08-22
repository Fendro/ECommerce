import { catchWrapper } from "../utils";
import { isOwner } from "../controllers/UserController";
import { Router } from "express";
import * as AddressController from "../controllers/AddressController";

const addressesRouter: Router = Router();

addressesRouter.delete(
  "/addresses/:user_id/:_id",
  isOwner,
  catchWrapper(AddressController.deleteAddress),
);
addressesRouter.get(
  "/addresses/:user_id",
  isOwner,
  catchWrapper(AddressController.getAddresses),
);
addressesRouter.get(
  "/addresses/:user_id/:_id",
  isOwner,
  catchWrapper(AddressController.getAddress),
);
addressesRouter.post(
  "/addresses/:user_id",
  isOwner,
  catchWrapper(AddressController.addAddress),
);
addressesRouter.put(
  "/addresses/:user_id/:_id",
  isOwner,
  catchWrapper(AddressController.editAddress),
);

export default addressesRouter;
