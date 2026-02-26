"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const error_messages_1 = require("../constants/error.messages");
const logger_1 = __importDefault(require("../utils/logger"));
function errorMiddleware(err, _req, res, _next) {
    logger_1.default.error(err.message);
    let statusCode = 500;
    let message = error_messages_1.ERROR.INTERNAL_SERVER_ERROR;
    if (err.message === error_messages_1.ERROR.INVALID_CREDENTIALS) {
        statusCode = 401;
        message = err.message;
    }
    if (err.message === error_messages_1.ERROR.USER_DOESNT_EXISTS) {
        statusCode = 404;
        message = err.message;
    }
    if (err.message === error_messages_1.ERROR.USER_EXISTS) {
        statusCode = 409;
        message = err.message;
    }
    if (res.headersSent) {
        return res.end();
    }
    res.status(statusCode).json({
        message,
    });
}
