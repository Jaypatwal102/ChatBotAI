"use client";

import { useState } from "react";
import { createChat, getAllChats } from "@/src/lib/api/chat.api";
import type { CreateChatPayload, Chat } from "@/src/types/chat.types";

export function useChat() {
  const [loading, setLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await getAllChats();

      setChats(res.data.chats);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const addChat = async (data: CreateChatPayload) => {
    setLoading(true);
    try {
      const res = await createChat(data);

      setChats((prev) => [res.data.chat, ...prev]);

      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    chats,
    loading,
    fetchChats,
    addChat,
  };
}
