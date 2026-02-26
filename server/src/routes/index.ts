import Router from "express";
import authHandler from "../modules/auth/handler";
import chatHandler from "../modules/chats/handler";
import messageHandler from "../modules/messages/handler";
const router = Router();
router.use("/auth", authHandler);
router.use("/chats", chatHandler);
router.use("/chats", messageHandler);
export default router;
