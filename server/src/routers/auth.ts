import { catchWrapper } from "../utils";
import { Router } from "express";
import * as UserController from "../controllers/UserController";

const authRouter: Router = Router();

authRouter.delete(
  "/auth",
  UserController.isLoggedIn,
  catchWrapper(UserController.deleteUser),
);
authRouter.post("/auth/login", catchWrapper(UserController.login));
authRouter.post("/auth", catchWrapper(UserController.register));
authRouter.post("/auth/logout", UserController.logout);
authRouter.put(
  "/auth",
  UserController.isLoggedIn,
  catchWrapper(UserController.editUser),
);

authRouter.post("/auth/logout", UserController.logout);

export default authRouter;
