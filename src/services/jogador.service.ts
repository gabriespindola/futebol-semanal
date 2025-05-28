import { PrismaClient } from '@prisma/client';
import * as jogadorRepository from '../repository/jogador.repository';
const prisma = new PrismaClient();

export async function listar() {
  try {
    return await jogadorRepository.listar();
  } catch (error) {
    throw new Error(`Service Error: Erro ao listar jogador: ${error}`);
  }
}

export async function buscarPorId(id: number) {
  try {
    return await jogadorRepository.buscarPorId(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao buscar jogador por ID: ${error}`);
  }
}

export async function criar(data: any) {
  try {
    return await jogadorRepository.criar(data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao criar jogador: ${error}`);
  }
}

export async function atualizar(id: number, data: any) {
  try {
    return await jogadorRepository.atualizar(id, data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao atualizar jogador: ${error}`);
  }
}

export async function deletar(id: number) {
  try {
    return await jogadorRepository.deletar(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao deletar jogador: ${error}`);
  }
}

export async function listarPartidasDoJogador(jogadorId: number) {
  return await jogadorRepository.listarPartidasDoJogador(jogadorId);
}

export async function listarEstatisticasDoJogador(jogadorId: number) {
  return await jogadorRepository.listarEstatisticasDoJogador(jogadorId);
}