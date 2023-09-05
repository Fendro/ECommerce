import { catchWrapper } from "utils";
import { Router } from "express";
import { UserController } from "controllers";

const authRouter: Router = Router();

authRouter.delete(
  "/auth",
  UserController.isLoggedIn,
  catchWrapper(UserController.deleteUser),
);
authRouter.post("/auth/login", catchWrapper(UserController.login));
authRouter.post("/auth", catchWrapper(UserController.register));
authRouter.post("/auth/guest", catchWrapper(UserController.registerGuest));
authRouter.post("/auth/logout", UserController.logout);
authRouter.put(
  "/auth",
  UserController.isLoggedIn,
  catchWrapper(UserController.editUser),
);

export default authRouter;
