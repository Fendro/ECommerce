import { Router } from "express";
import * as AdminController from "../controllers/AdminController";
import * as UserController from "../controllers/UserController";
const adminRouter: Router = Router();

adminRouter.get(
  "/admin/users",
  AdminController.isAdmin,
  AdminController.getUsers,
);
adminRouter.get(
  "/admin/users/:email",
  AdminController.isAdmin,
  AdminController.getUser,
);
adminRouter.put(
  "/admin/users/:email",
  AdminController.isAdmin,
  UserController.editAccount,
);
adminRouter.delete(
  "/admin/users/:email",
  AdminController.isAdmin,
  UserController.deleteAccount,
);

export default adminRouter;
