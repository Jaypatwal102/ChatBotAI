import { Router } from "express";
import { ROUTES } from "../../routes/routes";
import { requireAuth } from "../../middlewares/requireAuth";
import { ChatController } from "./controller";
const router = Router();
router.post(ROUTES.CHAT.CreateChat, requireAuth, ChatController.createChat);
router.get(ROUTES.CHAT.GetAllChats, requireAuth, ChatController.getAllChat);
router.delete(ROUTES.CHAT.DeleteChat, requireAuth, ChatController.deleteChat);

export default router;
