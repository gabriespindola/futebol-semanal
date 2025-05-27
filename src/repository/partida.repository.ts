import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function listar() {
  return prisma.partida.findMany();
}

export function buscarPorId(id: number) {
  return prisma.partida.findUnique({ where: { id } });
}

export function criar(data: any) {
  return prisma.partida.create({ data });
}

export function atualizar(id: number, data: any) {
  return prisma.partida.update({ where: { id }, data });
}

export function deletar(id: number) {
  return prisma.partida.delete({ where: { id } });
}