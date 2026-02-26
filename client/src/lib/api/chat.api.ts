import { apiClient } from "./client";
import {
  GetAllChatsResponse,
  CreateChatPayload,
  CreateChatResponse,
  ApiDeleteResponse,
} from "@/src/types/chat.types";

export function createChat(data: CreateChatPayload) {
  return apiClient<CreateChatResponse>("/api/chats/", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
}

export function getAllChats() {
  return apiClient<GetAllChatsResponse>("/api/chats/", {
    method: "GET",
    credentials: "include",
  });
}

export function deleteChat(chatSessionId: string) {
  return apiClient<ApiDeleteResponse>(`/api/chats/${chatSessionId}`, {
    method: "DELETE",
    credentials: "include",
  });
}
