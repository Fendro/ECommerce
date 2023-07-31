import * as UserController from "../controllers/UserController";
import { catchWrapper } from "../utils/catchWrapper";
import { Router } from "express";
const authRouter: Router = Router();

authRouter.get("/auth", catchWrapper(UserController.login));
authRouter.post("/auth", catchWrapper(UserController.register));
authRouter.put(
  "/auth",
  UserController.isLoggedIn,
  catchWrapper(UserController.editAccount),
);
authRouter.delete(
  "/auth",
  UserController.isLoggedIn,
  catchWrapper(UserController.deleteAccount),
);

authRouter.post("/auth/logout", UserController.logout);

export default authRouter;
