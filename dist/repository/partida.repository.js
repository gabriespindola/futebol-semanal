import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export function listar() {
    return prisma.partida.findMany();
}
export function buscarPorId(id) {
    return prisma.partida.findUnique({ where: { id } });
}
export function criar(data) {
    return prisma.partida.create({ data });
}
export function atualizar(id, data) {
    return prisma.partida.update({ where: { id }, data });
}
export function deletar(id) {
    return prisma.partida.delete({ where: { id } });
}
