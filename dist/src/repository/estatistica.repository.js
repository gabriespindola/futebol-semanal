"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listar = listar;
exports.buscarPorId = buscarPorId;
exports.criar = criar;
exports.atualizar = atualizar;
exports.deletar = deletar;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function listar() {
    return await prisma.estatistica.findMany({
        include: { jogador: true, partida: true },
    });
}
async function buscarPorId(id) {
    return await prisma.estatistica.findUnique({
        where: { id },
        include: { jogador: true, partida: true },
    });
}
async function criar(data) {
    return await prisma.estatistica.create({ data });
}
async function atualizar(id, data) {
    return await prisma.estatistica.update({ where: { id }, data });
}
async function deletar(id) {
    return await prisma.estatistica.delete({ where: { id } });
}
