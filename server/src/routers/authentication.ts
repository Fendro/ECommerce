import { Router } from "express";
import * as UserController from "../controllers/userController";
const authRouter: Router = Router();

authRouter.get("/auth", UserController.login);
authRouter.post("/auth", UserController.register);
authRouter.put("/auth");
authRouter.delete("/auth", UserController.deleteAccount);

export default authRouter;
