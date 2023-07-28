import { Router } from "express";
import * as UserController from "../controllers/UserController";
const authRouter: Router = Router();

authRouter.get("/auth", UserController.login);
authRouter.post("/auth", UserController.register);
authRouter.put("/auth", UserController.editAccount);
authRouter.delete("/auth", UserController.deleteAccount);

authRouter.post("/auth/logout", UserController.logout);

export default authRouter;
