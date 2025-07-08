import pool from '../database/connection';

export async function listar() {
  const result = await pool.query('SELECT * FROM estatisticas');
  return result.rows;
}

export async function buscarPorId(id: number) {
  const result = await pool.query('SELECT * FROM estatisticas WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criar(data: any) {
  const { jogadorId, partidaId, gols, assistencias } = data;
  const result = await pool.query(
    'INSERT INTO estatisticas (jogadorId, partidaId, gols, assistencias) VALUES ($1, $2, $3, $4) RETURNING *',
    [jogadorId, partidaId, gols, assistencias]
  );
  return result.rows[0];
}

export async function atualizar(id: number, data: any) {
  const campos = [];
  const valores = [];
  let idx = 1;
  for (const key in data) {
    campos.push(`${key} = $${idx}`);
    valores.push(data[key]);
    idx++;
  }
  valores.push(id);
  const query = `UPDATE estatisticas SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, valores);
  return result.rows[0];
}

export async function deletar(id: number) {
  await pool.query('DELETE FROM estatisticas WHERE id = $1', [id]);
  return true;
}