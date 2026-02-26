export const ROUTES = {
  AUTH_ROUTE: {
    Register: "/register",
    Login: "/login",
  },

  CHAT: {
    CreateChat: "/",
    GetAllChats: "/",
    DeleteChat: "/:chatSessionId",
  },

  MESSAGES: {
    Send: "/:chatSessionId/messages",
    GetByChat: "/:chatSessionId/messages",
    GetAIResponse: "/:chatSessionId/messagesresponse",
  },
};
