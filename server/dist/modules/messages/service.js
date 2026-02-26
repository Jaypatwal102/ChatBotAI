"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const dao_1 = require("../chats/dao");
const logger_1 = __importDefault(require("../../utils/logger"));
const error_messages_1 = require("../../constants/error.messages");
const log_messages_1 = require("../../constants/log.messages");
const ai_1 = require("../../utils/ai");
const dao_2 = require("./dao");
exports.MessageService = {
    async getMessages(userId, chatSessionId) {
        const chatSession = await dao_1.chatDao.findChatById(chatSessionId);
        if (!chatSession) {
            logger_1.default.warn(error_messages_1.ERROR.CHAT_NOT_FOUND);
            throw new Error(`Chat with id ${chatSessionId} is not found`);
        }
        const message = await dao_2.MessagesDao.findMessagesById(chatSessionId);
        logger_1.default.info(`${log_messages_1.LOG.MESSAGES_FETCH_SUCCESS} userId=${userId} chatSessionId=${chatSessionId} count=${message.length}`);
        return {
            message,
        };
    },
    async createMessage(userId, chatSessionId, content) {
        const chatSession = await dao_1.chatDao.findChatById(chatSessionId);
        if (!chatSession) {
            logger_1.default.warn(error_messages_1.ERROR.CHAT_NOT_FOUND);
            throw new Error(`Chat with id ${chatSessionId} is not found`);
        }
        const message = await (0, ai_1.getAIResponse)(content);
        await dao_2.MessagesDao.createMessage(chatSessionId, content, "USER");
        await dao_2.MessagesDao.createMessage(chatSessionId, message, "ASSISTANT");
        logger_1.default.info(`${log_messages_1.LOG.MESSAGES_FETCH_SUCCESS} userId=${userId} chatSessionId=${chatSessionId} {message: ${message}}`);
        return { message };
    },
};
