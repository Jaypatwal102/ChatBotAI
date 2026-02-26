"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useMessages } from "@/src/hooks/messageHooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chats() {
  const [usermessage, setUserMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const chatSessionId = useParams().id?.toString() || "";

  const { messages, loading, fetchMessages, sendMessage } =
    useMessages(chatSessionId);

  /* Fetch messages when chat changes */
  useEffect(() => {
    if (chatSessionId) {
      fetchMessages();
    }
  }, [chatSessionId]);

  /* Auto scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usermessage.trim()) return;

    await sendMessage({ content: usermessage.trim() });
    setUserMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-background relative">
      <div className="shrink-0 top-0 border-b  bg-background px-4 md:px-6 py-4">
        <h1 className="text-lg font-semibold">Chat</h1>
      </div>

      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto  px-4 md:px-6 py-6 pb-28 space-y-6">
        {messages.map((message, index) => {
          const isUser = message.role === "USER";

          return (
            <div
              key={index}
              className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`
                px-4 py-3 rounded-xl 
                max-w-[90%] md:max-w-[65%]
                text-sm md:text-base
                break-words whitespace-pre-wrap
                overflow-hidden min-w-0
                ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}
              `}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ children }) {
                      return (
                        <pre className="overflow-x-auto rounded-md p-3 bg-black/80 text-white text-xs">
                          <code>{children}</code>
                        </pre>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <div className=" shrink-0 border-t bg-background px-4 md:px-6 py-4">
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
