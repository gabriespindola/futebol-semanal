import pool from '../db';
import bcrypt from 'bcrypt';

export async function listarUsuarios() {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
}

export async function buscarUsuarioPorId(id: number) {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criarUsuario(data: any) {
  const { nome, email, senha, telefone } = data;
  const result = await pool.query(
    'INSERT INTO usuarios (nome, email, senha, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, email, senha, telefone]
  );
  return result.rows[0];
}

export async function atualizarUsuario(id: number, data: any) {
  const campos = [];
  const valores = [];
  let idx = 1;
  for (const key in data) {
    campos.push(`${key} = $${idx}`);
    valores.push(data[key]);
    idx++;
  }
  valores.push(id);
  const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, valores);
  return result.rows[0];
}

export async function deletarUsuario(id: number) {
  await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  return true;
}

export async function buscarUsuarioPorEmail(email: string) {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
}

export async function findUserByEmailAndPassword(email: string, password: string) {
  // Primeiro busca o usuário pelo email
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  const user = result.rows[0];
  
  // Se não encontrou usuário, retorna undefined
  if (!user) return undefined;
  
  // Compara a senha fornecida com o hash armazenado
  const isPasswordValid = await bcrypt.compare(password, user.senha);
  
  // Retorna o usuário se a senha estiver correta, senão undefined
  return isPasswordValid ? user : undefined;
}