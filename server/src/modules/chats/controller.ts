import { Request, Response, NextFunction } from "express";
import { SUCCESS } from "../../constants/success.messages";
import { ChatService } from "./services";

export const ChatController = {
  async createChat(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const { title } = req.body;

      const chat = await ChatService.createChat(userId, title);
      return res.status(201).json({
        message: SUCCESS.CHAT_CREATED,
        data: { chat },
      });
    } catch (error) {
      next(error);
    }
  },

  async getAllChat(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const chats = await ChatService.getAllChats(userId);
      return res.status(200).json({
        message: SUCCESS.CHAT_FETCHED,
        data: { chats },
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatSessionId } = req.params;

      if (Array.isArray(chatSessionId)) {
        throw new Error("Invalid chatSessionId");
      }

      await ChatService.deleteChat(chatSessionId);
      return res.status(200).json({
        message: SUCCESS.CHAT_DELETED,
      });
    } catch (error) {
      next(error);
    }
  },
};
