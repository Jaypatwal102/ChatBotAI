"use client";

import { useState } from "react";
import { getMessages, createMessage } from "@/src/lib/api/message.api";
import type {
  Message,
  CreateMessagePayload,
  chatMessage,
} from "@/src/types/message.types";

export function useMessages(chatSessionId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<chatMessage[]>([]);

  const fetchMessages = async () => {
    if (!chatSessionId) return;

    setLoading(true);
    try {
      const res = await getMessages(chatSessionId);
      setMessages(res.data.message);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (data: CreateMessagePayload) => {
    if (!chatSessionId) return;

    setLoading(true);
    try {
      if (!data.content.trim()) return;
      const tempUserMessage: chatMessage = {
        content: data.content,
        role: "USER",
      };

      setMessages((prev) => [...prev, tempUserMessage]);

      const res = await createMessage(chatSessionId, data);

      const aiMessage: chatMessage = {
        content: res.data.message,
        role: "ASSISTANT",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    fetchMessages,
    sendMessage,
  };
}
