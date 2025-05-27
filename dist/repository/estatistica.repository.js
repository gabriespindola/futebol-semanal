import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export function listar() {
    return prisma.estatistica.findMany({
        include: { jogador: true, partida: true },
    });
}
export function buscarPorId(id) {
    return prisma.estatistica.findUnique({
        where: { id },
        include: { jogador: true, partida: true },
    });
}
export function criar(data) {
    return prisma.estatistica.create({ data });
}
export function atualizar(id, data) {
    return prisma.estatistica.update({ where: { id }, data });
}
export function deletar(id) {
    return prisma.estatistica.delete({ where: { id } });
}
