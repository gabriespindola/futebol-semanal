import * as timesRepository from '../repository/times.repository';

export async function listar() {
  return timesRepository.listarTimes();
}

export async function buscarPorId(id: number) {
  return timesRepository.buscarTimePorId(id);
}

export async function criar(data: any) {
  return timesRepository.criarTime(data);
}

export async function atualizar(id: number, data: any) {
  return timesRepository.atualizarTime(id, data);
}

export async function deletar(id: number) {
  return timesRepository.deletarTime(id);
}
