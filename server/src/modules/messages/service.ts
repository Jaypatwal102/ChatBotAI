import { chatDao } from "../chats/dao";
import logger from "../../utils/logger";
import { ERROR } from "../../constants/error.messages";
import { LOG } from "../../constants/log.messages";
import { getAIResponse } from "../../utils/ai";
import { MessagesDao } from "./dao";
import { log } from "node:console";

export const MessageService = {
  async getMessages(userId: string, chatSessionId: string) {
    const chatSession = await chatDao.findChatById(chatSessionId);
    if (!chatSession) {
      logger.warn(ERROR.CHAT_NOT_FOUND);
      throw new Error(`Chat with id ${chatSessionId} is not found`);
    }

    const message = await MessagesDao.findMessagesById(chatSessionId);

    logger.info(
      `${LOG.MESSAGES_FETCH_SUCCESS} userId=${userId} chatSessionId=${chatSessionId} count=${message.length}`,
    );
    return {
      message,
    };
  },

  async createMessage(userId: string, chatSessionId: string, content: string) {
    const chatSession = await chatDao.findChatById(chatSessionId);
    if (!chatSession) {
      logger.warn(ERROR.CHAT_NOT_FOUND);
      throw new Error(`Chat with id ${chatSessionId} is not found`);
    }
    const message = await getAIResponse(content as string);
    await MessagesDao.createMessage(chatSessionId, content, "USER");
    await MessagesDao.createMessage(chatSessionId, message, "ASSISTANT");
    logger.info(
      `${LOG.MESSAGES_FETCH_SUCCESS} userId=${userId} chatSessionId=${chatSessionId} `,
    );
    return { message };
  },
};
