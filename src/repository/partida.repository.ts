import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listar() {
  return prisma.partida.findMany();
}

export async function buscarPorId(id: number) {
  return prisma.partida.findUnique({ where: { id } });
}

export async function criar(data: any) {
  return prisma.partida.create({ data });
}

export async function atualizar(id: number, data: any) {
  return prisma.partida.update({ where: { id }, data });
}

export async function deletar(id: number) {
  return prisma.partida.delete({ where: { id } });
}

export async function listarJogadoresDaPartida(partidaId: number) {
  return prisma.estatistica.findMany({
    where: { partidaId },
    include: {
      jogador: true,
    },
  });
}