import { Request, Response, NextFunction } from "express";
import { SUCCESS } from "../../constants/success.messages";
import { MessageService } from "./service";
export const MessageController = {
  async getMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const chatSessionId = req.params.chatSessionId as string;

      const result = await MessageService.getMessages(userId, chatSessionId);

      return res
        .status(200)
        .json({ message: SUCCESS.MESSAGE_FETCHED, data: result });
    } catch (error) {
      next(error);
    }
  },

  async createMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId!;
      const chatSessionId = req.params.chatSessionId as string;
      const { content } = req.body;
      const result = await MessageService.createMessage(
        userId,
        chatSessionId,
        content,
      );

      return res
        .status(200)
        .json({ message: SUCCESS.MESSAGE_CREATED, data: result });
    } catch (error) {
      next(error);
    }
  },
};
