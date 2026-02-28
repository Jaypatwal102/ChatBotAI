import { NextFunction, Request, Response } from "express";
import { AuthService } from "./service";
import { SUCCESS } from "../../constants/success.messages";

export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const result = await AuthService.register(name, email, password);
      const { token } = result;
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: SUCCESS.USER_REGISTERED,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      const { token } = result;
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: SUCCESS.USER_LOGGED_IN,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
