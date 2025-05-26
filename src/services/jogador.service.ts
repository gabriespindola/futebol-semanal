import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function listar() {
  return prisma.jogador.findMany();
}

export function buscarPorId(id: number) {
  return prisma.jogador.findUnique({ where: { id } });
}

export function criar(data: any) {
  return prisma.jogador.create({ data });
}

export function atualizar(id: number, data: any) {
  return prisma.jogador.update({ where: { id }, data });
}

export function deletar(id: number) {
  return prisma.jogador.delete({ where: { id } });
}
