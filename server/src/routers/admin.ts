import { Router } from "express";
import * as AdminController from "../controllers/AdminController";
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
  AdminController.editAccount,
);
adminRouter.delete(
  "/admin/users/:email",
  AdminController.isAdmin,
  AdminController.deleteAccount,
);

export default adminRouter;
