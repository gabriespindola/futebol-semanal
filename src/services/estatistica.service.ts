import { PrismaClient } from '@prisma/client';
import * as estatisticaRepository from '../repository/estatistica.repository';

const prisma = new PrismaClient();

export async function listar() {
  try {
    return await estatisticaRepository.listar();
  } catch (error) {
    throw new Error(`Service Error: Erro ao listar estatísticas: ${error}`);
  }
}

export async function buscarPorId(id: number) {
  try {
    return await estatisticaRepository.buscarPorId(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao obter estatística por ID: ${error}`);
  }
}

export async function criar(data: any) {
  try {
    return await estatisticaRepository.criar(data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao criar estatísticas: ${error}`);
  }
}

export async function atualizar(id: number, data: any) {
  try {
    return await estatisticaRepository.atualizar(id, data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao atualizar estatísticas: ${error}`);
  }
}

export async function deletar(id: number) {
  try {
    return await estatisticaRepository.deletar(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao deletar estatísticas: ${error}`);
  }
}