"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const service_1 = require("./service");
const success_messages_1 = require("../../constants/success.messages");
exports.AuthController = {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const result = await service_1.AuthService.register(name, email, password);
            const { token } = result;
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                message: success_messages_1.SUCCESS.USER_REGISTERED,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await service_1.AuthService.login(email, password);
            const { token } = result;
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.status(200).json({
                message: success_messages_1.SUCCESS.USER_LOGGED_IN,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    },
};
