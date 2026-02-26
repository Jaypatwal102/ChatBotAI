"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("../../routes/routes");
const express_1 = __importDefault(require("express"));
const zodValidator_1 = require("../../middlewares/zodValidator");
const auth_schema_1 = require("../../validator/auth.schema");
const controller_1 = require("./controller");
const router = (0, express_1.default)();
router.post(routes_1.ROUTES.AUTH_ROUTE.Login, (0, zodValidator_1.validate)(auth_schema_1.loginSchema), controller_1.AuthController.login);
router.post(routes_1.ROUTES.AUTH_ROUTE.Register, (0, zodValidator_1.validate)(auth_schema_1.registerSchema), controller_1.AuthController.register);
exports.default = router;
