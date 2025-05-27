import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export function listar() {
    return prisma.jogador.findMany();
}
export function buscarPorId(id) {
    return prisma.jogador.findUnique({ where: { id } });
}
export function criar(data) {
    return prisma.jogador.create({ data });
}
export function atualizar(id, data) {
    return prisma.jogador.update({ where: { id }, data });
}
export function deletar(id) {
    return prisma.jogador.delete({ where: { id } });
}
