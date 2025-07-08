
import * as jogadorRepository from '../repository/jogador.repository';

export async function listar() {
  return jogadorRepository.listar();
}

export async function buscarPorId(id: number) {
  return jogadorRepository.buscarPorId(id);
}

export async function criar(data: any) {
  return jogadorRepository.criar(data);
}

export async function atualizar(id: number, data: any) {
  return jogadorRepository.atualizar(id, data);
}

export async function deletar(id: number) {
  return jogadorRepository.deletar(id);
}

export async function listarPartidasDoJogador(jogadorId: number) {
  return jogadorRepository.listarPartidasDoJogador(jogadorId);
}

export async function listarEstatisticasDoJogador(jogadorId: number) {
  return jogadorRepository.listarEstatisticasDoJogador(jogadorId);
}