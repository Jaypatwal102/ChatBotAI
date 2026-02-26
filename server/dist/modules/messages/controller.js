"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const success_messages_1 = require("../../constants/success.messages");
const service_1 = require("./service");
exports.MessageController = {
    async getMessages(req, res, next) {
        try {
            const userId = req.userId;
            const chatSessionId = req.params.chatSessionId;
            const result = await service_1.MessageService.getMessages(userId, chatSessionId);
            return res
                .status(200)
                .json({ message: success_messages_1.SUCCESS.MESSAGE_FETCHED, data: result });
        }
        catch (error) {
            next(error);
        }
    },
    async createMessage(req, res, next) {
        try {
            const userId = req.userId;
            const chatSessionId = req.params.chatSessionId;
            const { content } = req.body;
            const result = await service_1.MessageService.createMessage(userId, chatSessionId, content);
            return res
                .status(200)
                .json({ message: success_messages_1.SUCCESS.MESSAGE_CREATED, data: result });
        }
        catch (error) {
            next(error);
        }
    },
};
