export interface CreateMessagePayload {
  content: string;
}
export interface chatMessage {
  role: "USER" | "ASSISTANT";
  content: string;
}
export interface Message {
  id: string;
  chatSessionId: string;
  content: string;
  role: "USER" | "ASSISTANT";
  createdAt: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type GetMessagesResponse = ApiResponse<{
  message: Message[];
}>;

export type CreateMessageResponse = ApiResponse<{
  message: string;
}>;
