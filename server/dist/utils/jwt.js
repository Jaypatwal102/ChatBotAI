"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_key = process.env.JWT_SECRET;
if (!secret_key) {
    throw new Error("JWT key is not set!");
}
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secret_key, { expiresIn: "7d" });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, secret_key);
};
exports.verifyToken = verifyToken;
