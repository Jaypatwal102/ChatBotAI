import Router from "express";
import { ROUTES } from "../../routes/routes";
import { requireAuth } from "../../middlewares/requireAuth";
import { validate } from "../../middlewares/zodValidator";
import {
  getMessagesSchema,
  sendMessageSchema,
} from "../../validator/message.schema";
import { MessageController } from "./controller";
const router = Router();
router.get(
  ROUTES.MESSAGES.GetByChat,
  requireAuth,
  validate(getMessagesSchema),
  MessageController.getMessages,
);
router.post(
  ROUTES.MESSAGES.GetAIResponse,
  requireAuth,
  validate(sendMessageSchema),
  MessageController.createMessage,
);

export default router;
