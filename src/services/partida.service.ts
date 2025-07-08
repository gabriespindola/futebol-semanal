
import * as partidaRepository from '../repository/partida.repository';

export async function listar() {
  return partidaRepository.listar();
}

export async function buscarPorId(id: number) {
  return partidaRepository.buscarPorId(id);
}

export async function criar(data: any) {
  return partidaRepository.criar(data);
}

export async function atualizar(id: number, data: any) {
  return partidaRepository.atualizar(id, data);
}

export async function deletar(id: number) {
  return partidaRepository.deletar(id);
}

export async function listarJogadoresDaPartida(partidaId: number) {
  return partidaRepository.listarJogadoresDaPartida(partidaId);
}