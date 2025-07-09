import pool from '../../db';

export async function listarEstatisticas() {
  const result = await pool.query('SELECT * FROM estatisticas');
  return result.rows;
}

export async function buscarEstatisticaPorId(id: number) {
  const result = await pool.query('SELECT * FROM estatisticas WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criarEstatistica(data: any) {
  // Adapte os campos conforme sua tabela de estatísticas
  const { jogadorId, partidaId, gols, assistencias, cartoesAmarelos, cartoesVermelhos } = data;
  const result = await pool.query(
    'INSERT INTO estatisticas (jogadorId, partidaId, gols, assistencias, cartoesAmarelos, cartoesVermelhos) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    [jogadorId, partidaId, gols, assistencias, cartoesAmarelos, cartoesVermelhos]
  );
  return result.rows[0];
}

export async function atualizarEstatistica(id: number, data: any) {
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

export async function deletarEstatistica(id: number) {
  await pool.query('DELETE FROM estatisticas WHERE id = $1', [id]);
  return true;
}
