"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDao = void 0;
const prisma_1 = require("../../lib/prisma");
exports.AuthDao = {
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({
            where: { email },
        });
    },
    async createUser(name, email, password) {
        return prisma_1.prisma.user.create({ data: { name, email, password } });
    },
};
