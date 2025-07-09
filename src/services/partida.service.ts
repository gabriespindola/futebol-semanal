import * as partidaRepository from '../repository/partida.repository';

export async function listar() {
  return partidaRepository.listarPartidas();
}

export async function buscarPorId(id: number) {
  return partidaRepository.buscarPartidaPorId(id);
}

export async function criar(data: any) {
  return partidaRepository.criarPartida(data);
}

export async function atualizar(id: number, data: any) {
  return partidaRepository.atualizarPartida(id, data);
}

export async function deletar(id: number) {
  return partidaRepository.deletarPartida(id);
}
