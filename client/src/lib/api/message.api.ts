import { apiClient } from "./client";
import {
  CreateMessagePayload,
  GetMessagesResponse,
  CreateMessageResponse,
} from "@/src/types/message.types";

export function getMessages(chatSessionId: string) {
  return apiClient<GetMessagesResponse>(`/api/chats/${chatSessionId}/messages`, {
    method: "GET",
    credentials: "include",
  });
}

export function createMessage(
  chatSessionId: string,
  data: CreateMessagePayload,
) {
  return apiClient<CreateMessageResponse>(
    `/api/chats/${chatSessionId}/messagesresponse`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    },
  );
}
