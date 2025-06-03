"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listar = listar;
exports.buscarPorId = buscarPorId;
exports.criar = criar;
exports.atualizar = atualizar;
exports.deletar = deletar;
exports.listarPartidasDoJogador = listarPartidasDoJogador;
exports.listarEstatisticasDoJogador = listarEstatisticasDoJogador;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function listar() {
    return prisma.jogador.findMany();
}
async function buscarPorId(id) {
    return prisma.jogador.findUnique({ where: { id } });
}
async function criar(data) {
    return prisma.jogador.create({ data });
}
async function atualizar(id, data) {
    return prisma.jogador.update({ where: { id }, data });
}
async function deletar(id) {
    return prisma.jogador.delete({ where: { id } });
}
async function listarPartidasDoJogador(jogadorId) {
    return prisma.estatistica.findMany({
        where: { jogadorId },
        include: {
            partida: true
        },
    });
}
async function listarEstatisticasDoJogador(jogadorId) {
    return prisma.estatistica.findMany({
        where: { jogadorId },
        include: {
            partida: true
        }
    });
}
