import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/user.schemas.js";

const userRouter = Router();

userRouter.post('/sign-up', validateSchema(userSchema), signUp);

userRouter.post('/sign-in', validateSchema(loginSchema), signIn);

export default userRouter;