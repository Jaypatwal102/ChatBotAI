"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesSchema = exports.sendMessageSchema = void 0;
const zod_1 = require("zod");
exports.sendMessageSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z
            .string()
            .min(1, "Message content cannot be empty")
            .max(4000, "Message too long"),
    }),
    params: zod_1.z.object({
        chatSessionId: zod_1.z.string().uuid("Invalid chat session id"),
    }),
});
exports.getMessagesSchema = zod_1.z.object({
    params: zod_1.z.object({
        chatSessionId: zod_1.z.string().uuid("Invalid chat session id"),
    }),
    query: zod_1.z.object({
        cursor: zod_1.z.string().uuid().optional(),
        limit: zod_1.z.coerce.number().min(1).max(50).optional(),
    }),
});
