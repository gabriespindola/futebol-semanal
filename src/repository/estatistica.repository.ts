import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export function listar() {
  return prisma.estatistica.findMany({
    include: { jogador: true, partida: true },
  });
}

export function buscarPorId(id: number) {
  return prisma.estatistica.findUnique({
    where: { id },
    include: { jogador: true, partida: true },
  });
}

export function criar(data: any) {
  return prisma.estatistica.create({ data });
}

export function atualizar(id: number, data: any) {
  return prisma.estatistica.update({ where: { id }, data });
}

export function deletar(id: number) {
  return prisma.estatistica.delete({ where: { id } });
}