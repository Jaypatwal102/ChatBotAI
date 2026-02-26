"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesDao = void 0;
const prisma_1 = require("../../lib/prisma");
exports.MessagesDao = {
    async findMessagesById(chatSessionId) {
        return prisma_1.prisma.message.findMany({
            where: { chatSessionId },
            orderBy: {
                createdAt: "asc",
            },
        });
    },
    async createMessage(chatSessionId, content, role) {
        return prisma_1.prisma.message.create({
            data: {
                chatSessionId,
                content,
                role,
            },
        });
    },
};
