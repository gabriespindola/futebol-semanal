import * as usuariosRepository from '../repository/usuarios.repository';


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


export async function atualizarParcial(id: number, data: any) {
  return usuariosRepository.atualizarUsuario(id, data);
}

export async function listar() {
  return usuariosRepository.listarUsuarios();
}

export async function login(data: any) {

  const user = await usuariosRepository.findUserByEmailAndPassword(data.email, data.password);
    if (!user) throw new Error('Invalid credentials');
  return user;
  return { message: 'Login function not yet implemented' };
}

export async function register(data: any) {
  // Verifica se o usuário já existe
  const existingUser = await usuariosRepository.buscarUsuarioPorEmail(data.email);
  if (existingUser) {
    throw new Error('Email já está em uso');
  }

  // Cria o novo usuário
  const newUser = await usuariosRepository.criarUsuario(data);
  
  // Remove a senha do objeto retornado por segurança
  const { senha, ...userWithoutPassword } = newUser;
  
  return userWithoutPassword;
}