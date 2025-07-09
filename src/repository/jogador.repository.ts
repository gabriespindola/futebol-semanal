import pool from '../db';

export async function listarJogadores() {
  const result = await pool.query('SELECT * FROM jogadores');
  return result.rows;
}

export async function buscarJogadorPorId(id: number) {
  const result = await pool.query('SELECT * FROM jogadores WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criarJogador(data: any) {
  const { nome, imagemUrl, dataNascimento, altura, peso, posicao, numeroCamisa, timeId, usuarioId } = data;
  const result = await pool.query(
    'INSERT INTO jogadores (nome, imagemUrl, dataNascimento, altura, peso, posicao, numeroCamisa, timeId, usuarioId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
    [nome, imagemUrl, dataNascimento, altura, peso, posicao, numeroCamisa, timeId, usuarioId]
  );
  return result.rows[0];
}

export async function atualizarJogador(id: number, data: any) {
  const campos = [];
  const valores = [];
  let idx = 1;
  for (const key in data) {
    campos.push(`${key} = $${idx}`);
    valores.push(data[key]);
    idx++;
  }
  valores.push(id);
  const query = `UPDATE jogadores SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, valores);
  return result.rows[0];
}

export async function deletarJogador(id: number) {
  await pool.query('DELETE FROM jogadores WHERE id = $1', [id]);
  return true;
}
