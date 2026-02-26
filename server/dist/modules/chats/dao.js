"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDao = void 0;
const prisma_1 = require("../../lib/prisma");
exports.chatDao = {
    async createChat(userId, title) {
        return prisma_1.prisma.chatSession.create({
            data: { userId, title },
        });
    },
    async findChatsByUser(userId) {
        return prisma_1.prisma.chatSession.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },
    async findChatById(chatSessionId) {
        return prisma_1.prisma.chatSession.findUnique({ where: { id: chatSessionId } });
    },
    async updateChatTitle(chatSessionId, title) {
        return prisma_1.prisma.chatSession.update({
            where: { id: chatSessionId },
            data: { title },
        });
    },
};
