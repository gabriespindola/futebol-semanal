import * as jogadorRepository from '../repository/jogador.repository';

export async function listar() {
  return jogadorRepository.listarJogadores();
}

export async function buscarPorId(id: number) {
  return jogadorRepository.buscarJogadorPorId(id);
}

export async function criar(data: any) {
  return jogadorRepository.criarJogador(data);
}

export async function atualizar(id: number, data: any) {
  return jogadorRepository.atualizarJogador(id, data);
}

export async function deletar(id: number) {
  return jogadorRepository.deletarJogador(id);
}
