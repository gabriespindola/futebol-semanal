"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listar = listar;
exports.buscarPorId = buscarPorId;
exports.criar = criar;
exports.atualizar = atualizar;
exports.deletar = deletar;
exports.listarJogadoresDaPartida = listarJogadoresDaPartida;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function listar() {
    return prisma.partida.findMany();
}
async function buscarPorId(id) {
    return prisma.partida.findUnique({ where: { id } });
}
async function criar(data) {
    return prisma.partida.create({ data });
}
async function atualizar(id, data) {
    return prisma.partida.update({ where: { id }, data });
}
async function deletar(id) {
    return prisma.partida.delete({ where: { id } });
}
async function listarJogadoresDaPartida(partidaId) {
    return prisma.estatistica.findMany({
        where: { partidaId },
        include: {
            jogador: true,
        },
    });
}
