import pool from '../../db';

export async function listarTimes() {
  const result = await pool.query('SELECT * FROM times');
  return result.rows;
}

export async function buscarTimePorId(id: number) {
  const result = await pool.query('SELECT * FROM times WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criarTime(data: any) {
  const { nome, corUniforme, cidade, estado, fundacao, usuarioId, fotoUrl } = data;
  const result = await pool.query(
    'INSERT INTO times (nome, corUniforme, cidade, estado, fundacao, usuarioId, fotoUrl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [nome, corUniforme, cidade, estado, fundacao, usuarioId, fotoUrl]
  );
  return result.rows[0];
}

export async function atualizarTime(id: number, data: any) {
  const campos = [];
  const valores = [];
  let idx = 1;
  for (const key in data) {
    campos.push(`${key} = $${idx}`);
    valores.push(data[key]);
    idx++;
  }
  valores.push(id);
  const query = `UPDATE times SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, valores);
  return result.rows[0];
}

export async function deletarTime(id: number) {
  await pool.query('DELETE FROM times WHERE id = $1', [id]);
  return true;
}
