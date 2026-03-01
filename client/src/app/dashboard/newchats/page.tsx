"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@/src/hooks/chatHooks";
import { useRouter } from "next/navigation";
import { createMessage } from "@/src/lib/api/message.api";
import { useChatCount } from "@/src/context/chatcontext";

export default function Chats() {
  const router = useRouter();
  const [usermessage, setUserMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const { addChat } = useChat();
  const { increaseChatCount } = useChatCount();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usermessage.trim()) return;

    setLoading(true);

    const messageText = usermessage.trim();
    setMessage(messageText);

    const res = await addChat({ title: messageText });
    const newChatId = res.data.chat.id;

    const data = {
      content: messageText,
      role: "USER",
    };

    await createMessage(newChatId, data);

    setLoading(false);
    increaseChatCount();
    router.push(`/dashboard/chats/${newChatId}`);
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b px-6 py-4 shrink-0">
        <h1 className="text-lg font-semibold">Chat</h1>
      </div>

      {/* Messages Area */}

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="flex w-full justify-end">
          {message && (
            <div
              className="
          px-4 py-3 rounded-xl
          max-w-[60%]
          text-sm md:text-base
          break-words
          bg-primary text-primary-foreground"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message}
              </ReactMarkdown>
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t bg-background px-6 py-4 shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-3 w-full">
          <Input
            value={usermessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={loading}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
}
