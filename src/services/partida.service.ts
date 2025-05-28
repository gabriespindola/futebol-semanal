import { PrismaClient } from '@prisma/client';
import * as partidaRepository from '../repository/partida.repository';

const prisma = new PrismaClient();

export async function listar() {
  try {
    return await partidaRepository.listar();
  } catch (error) {
    throw new Error(`Service Error: Erro ao listar partida: ${error}`);
  }
}

export async function buscarPorId(id: number) {
  try {
    return await partidaRepository.buscarPorId(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao buscar partida por ID: ${error}`);
  }
}

export async function criar(data: any) {
  try {
    return await partidaRepository.criar(data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao criar partida: ${error}`);
  }
}

export async function atualizar(id: number, data: any) {
  try {
    return await partidaRepository.atualizar(id, data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao atualizar partida: ${error}`);
  }
}

export async function deletar(id: number) {
  try {
      return await partidaRepository.deletar(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao deletar partida: ${error}`);
  }
}

export async function listarJogadoresDaPartida(partidaId: number) {
  return await partidaRepository.listarJogadoresDaPartida(partidaId);
}