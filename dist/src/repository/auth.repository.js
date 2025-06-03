"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encontrarPorEmail = encontrarPorEmail;
exports.criarUsuario = criarUsuario;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function encontrarPorEmail(email) {
    try {
        return await prisma.usuario.findUnique({ where: { email } });
    }
    catch (error) {
        throw new Error('Erro ao buscar usuário por e-mail');
    }
}
async function criarUsuario(data) {
    try {
        return await prisma.usuario.create({ data });
    }
    catch (error) {
        throw new Error('Erro ao criar usuário');
    }
}
