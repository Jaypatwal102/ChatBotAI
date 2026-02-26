export interface CreateChatPayload {
  title: string;
}

export interface Chat {
  id: string;
  title: string | null;
  createdAt: string;
}

export interface ApiDeleteResponse {
  message: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type GetAllChatsResponse = ApiResponse<{
  chats: Chat[];
}>;

export type CreateChatResponse = ApiResponse<{
  chat: Chat;
}>;
