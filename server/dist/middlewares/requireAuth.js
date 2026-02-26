"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const logger_1 = __importDefault(require("../utils/logger"));
const log_messages_1 = require("../constants/log.messages");
const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        logger_1.default.warn(log_messages_1.LOG.AUTH_MISSING_TOKEN);
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.userId = payload.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.requireAuth = requireAuth;
