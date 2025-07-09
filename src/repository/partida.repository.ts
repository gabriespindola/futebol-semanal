import pool from '../../db';

export async function listarPartidas() {
  const result = await pool.query('SELECT * FROM partidas');
  return result.rows;
}

export async function buscarPartidaPorId(id: number) {
  const result = await pool.query('SELECT * FROM partidas WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criarPartida(data: any) {
  const { local, dataHora, condicoesClimaticas, campeonato, timeCasaId, timeVisitanteId, placarCasa, placarVisitante } = data;
  const result = await pool.query(
    'INSERT INTO partidas (local, dataHora, condicoesClimaticas, campeonato, timeCasaId, timeVisitanteId, placarCasa, placarVisitante) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [local, dataHora, condicoesClimaticas, campeonato, timeCasaId, timeVisitanteId, placarCasa, placarVisitante]
  );
  return result.rows[0];
}

export async function atualizarPartida(id: number, data: any) {
  const campos = [];
  const valores = [];
  let idx = 1;
  for (const key in data) {
    campos.push(`${key} = $${idx}`);
    valores.push(data[key]);
    idx++;
  }
  valores.push(id);
  const query = `UPDATE partidas SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, valores);
  return result.rows[0];
}

export async function deletarPartida(id: number) {
  await pool.query('DELETE FROM partidas WHERE id = $1', [id]);
  return true;
}
