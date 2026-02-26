"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTES = void 0;
exports.ROUTES = {
    AUTH_ROUTE: {
        Register: "/register",
        Login: "/login",
    },
    CHAT: {
        CreateChat: "/",
        GetAllChats: "/",
    },
    MESSAGES: {
        Send: "/:chatSessionId/messages",
        GetByChat: "/:chatSessionId/messages",
        GetAIResponse: "/:chatSessionId/messagesresponse",
    },
};
