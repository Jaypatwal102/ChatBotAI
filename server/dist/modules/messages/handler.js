"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../routes/routes");
const requireAuth_1 = require("../../middlewares/requireAuth");
const zodValidator_1 = require("../../middlewares/zodValidator");
const message_schema_1 = require("../../validator/message.schema");
const controller_1 = require("./controller");
const router = (0, express_1.default)();
router.get(routes_1.ROUTES.MESSAGES.GetByChat, requireAuth_1.requireAuth, (0, zodValidator_1.validate)(message_schema_1.getMessagesSchema), controller_1.MessageController.getMessages);
router.post(routes_1.ROUTES.MESSAGES.GetAIResponse, requireAuth_1.requireAuth, (0, zodValidator_1.validate)(message_schema_1.sendMessageSchema), controller_1.MessageController.createMessage);
exports.default = router;
