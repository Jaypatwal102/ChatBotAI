"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const logger_1 = __importDefault(require("../../utils/logger"));
const dao_1 = require("./dao");
const log_messages_1 = require("../../constants/log.messages");
exports.ChatService = {
    async createChat(userId, title) {
        logger_1.default.info(`${log_messages_1.LOG.CHAT_CREATE_START} userId=${userId}`);
        const chat = await dao_1.chatDao.createChat(userId, title);
        logger_1.default.info(`${log_messages_1.LOG.CHAT_CREATE_SUCCESS} userId=${userId} chatId=${chat.id}`);
        return chat;
    },
    async getAllChats(userId) {
        const chats = await dao_1.chatDao.findChatsByUser(userId);
        logger_1.default.info(`${log_messages_1.LOG.CHAT_FETCH_SUCCESS} userId=${userId} count=${chats.length}`);
        return chats;
    },
};
