import * as usuariosRepository from '../repository/usuarios.repository';

export async function listar() {
  return usuariosRepository.listarUsuarios();
}

export async function buscarPorId(id: number) {
  return usuariosRepository.buscarUsuarioPorId(id);
}

export async function criar(data: any) {
  return usuariosRepository.criarUsuario(data);
}

export async function atualizar(id: number, data: any) {
  return usuariosRepository.atualizarUsuario(id, data);
}

export async function deletar(id: number) {
  return usuariosRepository.deletarUsuario(id);
}

export async function buscarPorEmail(email: string) {
  return usuariosRepository.buscarUsuarioPorEmail(email);
}
