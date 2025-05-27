import { PrismaClient } from '@prisma/client';
import * as jogadorRepository from '../repository/jogador.repository';
const prisma = new PrismaClient();

export function listar() {
  try {
    return jogadorRepository.listar();
  } catch (error) {
    throw new Error(`Service Error: Erro ao listar jogador: ${error}`);
  }
}

export function buscarPorId(id: number) {
  try {
    return jogadorRepository.buscarPorId(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao buscar jogador por ID: ${error}`);
  }
}

export function criar(data: any) {
  try {
    return jogadorRepository.criar(data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao criar jogador: ${error}`);
  }
}

export function atualizar(id: number, data: any) {
  try {
    return jogadorRepository.atualizar(id, data);
  } catch (error) {
    throw new Error(`Service Error: Erro ao atualizar jogador: ${error}`);
  }
}

export function deletar(id: number) {
  try {
    return jogadorRepository.deletar(id);
  } catch (error) {
    throw new Error(`Service Error: Erro ao deletar jogador: ${error}`);
  }
}
