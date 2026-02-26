import { prisma } from "../../lib/prisma";

export const chatDao = {
  async createChat(userId: string, title: string) {
    return prisma.chatSession.create({
      data: { userId, title },
    });
  },

  async findChatsByUser(userId: string) {
    return prisma.chatSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async findChatById(chatSessionId: string) {
    return prisma.chatSession.findUnique({ where: { id: chatSessionId } });
  },
  async deleteChat(chatSessionId: string) {
    return prisma.chatSession.delete({ where: { id: chatSessionId } });
  },
  async updateChatTitle(chatSessionId: string, title: string) {
    return prisma.chatSession.update({
      where: { id: chatSessionId },
      data: { title },
    });
  },
};
