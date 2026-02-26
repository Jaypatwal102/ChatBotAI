"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const success_messages_1 = require("../../constants/success.messages");
const services_1 = require("./services");
exports.ChatController = {
    async createChat(req, res, next) {
        try {
            const userId = req.userId;
            const { title } = req.body;
            const chat = await services_1.ChatService.createChat(userId, title);
            return res.status(201).json({
                message: success_messages_1.SUCCESS.CHAT_CREATED,
                data: { chat },
            });
        }
        catch (error) {
            next(error);
        }
    },
    async getAllChat(req, res, next) {
        try {
            const userId = req.userId;
            const chats = await services_1.ChatService.getAllChats(userId);
            return res.status(200).json({
                message: success_messages_1.SUCCESS.CHAT_FETCHED,
                data: { chats },
            });
        }
        catch (error) {
            next(error);
        }
    },
};
