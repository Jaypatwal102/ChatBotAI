import { ROUTES } from "../../routes/routes";
import Router from "express";
import { validate } from "../../middlewares/zodValidator";
import { loginSchema, registerSchema } from "../../validator/auth.schema";
import { AuthController } from "./controller";

const router = Router();
router.post(
  ROUTES.AUTH_ROUTE.Login,
  validate(loginSchema),
  AuthController.login,
);
router.post(
  ROUTES.AUTH_ROUTE.Register,
  validate(registerSchema),
  AuthController.register,
);

export default router;
