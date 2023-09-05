import { catchWrapper } from "utils";
import { Router } from "express";
import { AdminController } from "controllers";

const adminRouter: Router = Router();

adminRouter.delete(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(AdminController.deleteUser),
);
adminRouter.get(
  "/admin/users",
  AdminController.isAdmin,
  catchWrapper(AdminController.getUsers),
);
adminRouter.get(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(AdminController.getUser),
);
adminRouter.put(
  "/admin/users/:_id",
  AdminController.isAdmin,
  catchWrapper(AdminController.editUser),
);

export default adminRouter;
