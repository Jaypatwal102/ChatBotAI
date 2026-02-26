import logger from "../../utils/logger";
import { chatDao } from "./dao";
import { LOG } from "../../constants/log.messages";

export const ChatService = {
  async createChat(userId: string, title: string) {
    logger.info(`${LOG.CHAT_CREATE_START} userId=${userId}`);

    const chat = await chatDao.createChat(userId, title);

    logger.info(
      `${LOG.CHAT_CREATE_SUCCESS} userId=${userId} chatId=${chat.id}`,
    );

    return chat;
  },
  async getAllChats(userId: string) {
    const chats = await chatDao.findChatsByUser(userId);

    logger.info(
      `${LOG.CHAT_FETCH_SUCCESS} userId=${userId} count=${chats.length}`,
    );

    return chats;
  },
  async deleteChat(chatSessionId: string) {
    await chatDao.deleteChat(chatSessionId);

    logger.info(`${LOG.CHAT_DELETE_SUCCESS} `);

    return true;
  },
};
