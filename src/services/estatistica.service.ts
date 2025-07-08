
import * as estatisticaRepository from '../repository/estatistica.repository';

export async function listar() {
  return estatisticaRepository.listar();
}

export async function buscarPorId(id: number) {
  return estatisticaRepository.buscarPorId(id);
}

export async function criar(data: any) {
  return estatisticaRepository.criar(data);
}

export async function atualizar(id: number, data: any) {
  return estatisticaRepository.atualizar(id, data);
}

export async function deletar(id: number) {
  return estatisticaRepository.deletar(id);
}