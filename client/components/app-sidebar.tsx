"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { useChat } from "@/src/hooks/chatHooks";
import { apiClient } from "@/src/lib/api/client";
import { useChatCount } from "@/src/context/chatcontext";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { deleteChat } from "@/src/lib/api/chat.api";

interface LogoutSuccessResponse {
  message: string;
}

export function AppSidebar() {
  const router = useRouter();
  const { chats, fetchChats, loading } = useChat();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { chatCount } = useChatCount();

  useEffect(() => {
    fetchChats();
  }, [chatCount]);

  const handleChatClick = (chatId: string) => {
    router.replace(`/dashboard/chats/${chatId}`);
    setSelectedChatId(chatId);
  };
  const handleLogout = async () => {
    apiClient<LogoutSuccessResponse>("/logout", {
      method: "POST",
      credentials: "include",
    });

    router.replace("/login");
  };
  const handleDelete = async (chatId: string) => {
    await deleteChat(chatId);
    if (chatId === selectedChatId) {
      router.replace("/dashboard/newchats");
      setSelectedChatId("-1");
    }
    fetchChats();
  };

  return (
    <Sidebar className="bg-white">
      {/* HEADER */}
      <SidebarHeader className="p-4 font-semibold text-lg">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 md:h-12 md:w-12">
            <AvatarImage
              src="/logo.png"
              alt="ChatBot AI"
              className="object-contain p-1"
            />
          </Avatar>

          <span className="text-lg md:text-xl font-semibold tracking-tight">
            ChatBot_AI
          </span>
        </div>
      </SidebarHeader>

      {/* MAIN CONTENT */}
      <SidebarContent className="p-2 space-y-2">
        <Button
          variant="outline"
          className={` w-full ${selectedChatId == "-1" ? "bg-muted" : ""}`}
          onClick={() => {
            handleChatClick("-1");
            router.push("/dashboard/newchats");
          }}
        >
          + New Chat
        </Button>
        {loading && (
          <p className="text-sm text-muted-foreground">Loading chats...</p>
        )}

        {!loading && chats.length === 0 && (
          <p className="text-sm text-muted-foreground">No chats available</p>
        )}

        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`
    group flex items-center justify-between
    w-full rounded-md px-3 py-2
    cursor-pointer
    hover:bg-muted
    ${selectedChatId === chat.id ? "bg-muted" : ""}
  `}
            onClick={() => handleChatClick(chat.id)}
          >
            {/* Chat Title */}
            <span className="text-sm truncate">
              {chat.title
                ? chat.title.charAt(0).toUpperCase() + chat.title.slice(1)
                : "UNTITLED CHAT"}
            </span>

            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()} // prevent chat click
                  className="opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this chat?</AlertDialogTitle>

                  <AlertDialogDescription>
                    This will permanently delete{" "}
                    <span className="font-medium">"{chat.title}"</span>. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(chat.id);
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        <div className="flex items-center justify-between gap-3 p-2">
          <span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
