"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const error_messages_1 = require("../../constants/error.messages");
const logger_1 = __importDefault(require("../../utils/logger"));
const log_messages_1 = require("../../constants/log.messages");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const dao_1 = require("./dao");
exports.AuthService = {
    async register(name, email, password) {
        logger_1.default.info(log_messages_1.LOG.AUTH_REGISTER_START);
        const existingUser = await dao_1.AuthDao.findByEmail(email);
        if (existingUser) {
            logger_1.default.warn(log_messages_1.LOG.AUTH_REGISTER_FAILED);
            throw new Error(error_messages_1.ERROR.USER_EXISTS);
        }
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        const user = await dao_1.AuthDao.createUser(name, email, hashedPassword);
        logger_1.default.info(log_messages_1.LOG.AUTH_REGISTER_SUCCESS);
        return {
            token: (0, jwt_1.signToken)({ userId: user.id, userName: user.name }),
        };
    },
    async login(email, password) {
        logger_1.default.info(log_messages_1.LOG.AUTH_LOGIN_START);
        const user = await dao_1.AuthDao.findByEmail(email);
        if (!user) {
            logger_1.default.warn(log_messages_1.LOG.AUTH_LOGIN_FAILED);
            throw new Error(error_messages_1.ERROR.USER_DOESNT_EXISTS);
        }
        const isValid = await (0, hash_1.comparePassword)(password, user.password);
        if (!isValid) {
            logger_1.default.warn(log_messages_1.LOG.AUTH_LOGIN_FAILED);
            throw new Error(error_messages_1.ERROR.INVALID_CREDENTIALS);
        }
        logger_1.default.info(log_messages_1.LOG.AUTH_LOGIN_SUCCESS);
        return {
            token: (0, jwt_1.signToken)({ userId: user.id, userName: user.name }),
        };
    },
};
