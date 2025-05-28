import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listar() {
  return await prisma.estatistica.findMany({
    include: { jogador: true, partida: true },
  });
}

export async function buscarPorId(id: number) {
  return await prisma.estatistica.findUnique({
    where: { id },
    include: { jogador: true, partida: true },
  });
}

export async function criar(data: any) {
  return await prisma.estatistica.create({ data });
}

export async function atualizar(id: number, data: any) {
  return await prisma.estatistica.update({ where: { id }, data });
}

export async function deletar(id: number) {
  return await prisma.estatistica.delete({ where: { id } });
}