import * as estatisticaRepository from '../repository/estatistica.repository';

export async function listar() {
  return estatisticaRepository.listarEstatisticas();
}

export async function buscarPorId(id: number) {
  return estatisticaRepository.buscarEstatisticaPorId(id);
}

export async function criar(data: any) {
  return estatisticaRepository.criarEstatistica(data);
}

export async function atualizar(id: number, data: any) {
  return estatisticaRepository.atualizarEstatistica(id, data);
}

export async function deletar(id: number) {
  return estatisticaRepository.deletarEstatistica(id);
}
