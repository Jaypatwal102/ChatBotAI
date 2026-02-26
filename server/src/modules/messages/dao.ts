import { prisma } from "../../lib/prisma";

export const MessagesDao = {
  async findMessagesById(chatSessionId: string) {
    return prisma.message.findMany({
      where: { chatSessionId },
      orderBy: {
        createdAt: "asc",
      },
    });
  },
  async createMessage(
    chatSessionId: string,
    content: string,
    role: "USER" | "ASSISTANT",
  ) {
    return prisma.message.create({
      data: {
        chatSessionId,
        content,
        role,
      },
    });
  },
};
