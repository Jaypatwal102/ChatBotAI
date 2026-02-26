"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = __importDefault(require("../modules/auth/handler"));
const handler_2 = __importDefault(require("../modules/chats/handler"));
const handler_3 = __importDefault(require("../modules/messages/handler"));
const router = (0, express_1.default)();
router.use("/auth", handler_1.default);
router.use("/chats", handler_2.default);
router.use("/chats", handler_3.default);
exports.default = router;
