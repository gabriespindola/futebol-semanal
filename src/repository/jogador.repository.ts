import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listar() {
  return prisma.jogador.findMany();
}

export async function buscarPorId(id: number) {
  return prisma.jogador.findUnique({ where: { id } });
}

export async function criar(data: any) {
  return prisma.jogador.create({ data });
}

export async function atualizar(id: number, data: any) {
  return prisma.jogador.update({ where: { id }, data });
}

export async function deletar(id: number) {
  return prisma.jogador.delete({ where: { id } });
}

export async function listarPartidasDoJogador(jogadorId: number) {
  return prisma.estatistica.findMany({
    where: { jogadorId },
    include: {
      partida: true
    },
  });
}

export async function listarEstatisticasDoJogador(jogadorId: number) {
  return prisma.estatistica.findMany({
    where: { jogadorId },
    include: { 
      partida: true 
    }
  });
}