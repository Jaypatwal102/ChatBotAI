"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ChatCountContextType {
  chatCount: number;
  increaseChatCount: () => void;
}
const ChatCountContext = createContext<ChatCountContextType | null>(null);

export function ChatCountProvider({ children }: { children: ReactNode }) {
  const [chatCount, setChatCount] = useState(0);

  const increaseChatCount = () => {
    setChatCount((prev) => prev + 1);
  };

  return (
    <ChatCountContext.Provider value={{ chatCount, increaseChatCount }}>
      {children}
    </ChatCountContext.Provider>
  );
}

export function useChatCount() {
  const context = useContext(ChatCountContext);

  if (!context) {
    throw new Error("useChatCount must be used inside ChatCountProvider");
  }

  return context;
}
