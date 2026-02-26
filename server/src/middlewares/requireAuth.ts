import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import logger from "../utils/logger";
import { LOG } from "../constants/log.messages";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    logger.warn(LOG.AUTH_MISSING_TOKEN);
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);

    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
