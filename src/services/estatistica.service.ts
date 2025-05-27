import { PrismaClient } from '@prisma/client';
import * as estatisticaRepository from '../repository/estatistica.repository';

const prisma = new PrismaClient();

export function listar() {
  try {
    return estatisticaRepository.listar();
  } catch (error) {
    throw new Error(`Service Error: Erro ao listar estatísticas: ${error}`);
  }
}

export function buscarPorId(id: number) {
  try {
    return estatisticaRepository.buscarPorId(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao obter estatística por ID: ${error}`);
  }
}

export function criar(data: any) {
  try {
    return estatisticaRepository.criar(data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao criar estatísticas: ${error}`);
  }
}

export function atualizar(id: number, data: any) {
  try {
    return estatisticaRepository.atualizar(id, data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao atualizar estatísticas: ${error}`);
  }
}

export function deletar(id: number) {
  try {
    return estatisticaRepository.deletar(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao deletar estatísticas: ${error}`);
  }
}