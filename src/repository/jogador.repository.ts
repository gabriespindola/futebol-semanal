import pool from '../database/connection';

export async function listar() {
  const result = await pool.query('SELECT * FROM jogadores');
  return result.rows;
}

export async function buscarPorId(id: number) {
  const result = await pool.query('SELECT * FROM jogadores WHERE id = $1', [id]);
  return result.rows[0];
}

export async function criar(data: any) {
  const { nome, imagem } = data;
  const result = await pool.query(
    'INSERT INTO jogadores (nome, imagem) VALUES ($1, $2) RETURNING *',
    [nome, imagem]
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
  const query = `UPDATE jogadores SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, valores);
  return result.rows[0];
}

export async function deletar(id: number) {
  await pool.query('DELETE FROM jogadores WHERE id = $1', [id]);
  return true;
}

export async function listarPartidasDoJogador(jogadorId: number) {
  return prisma.estatistica.findMany({
    where: { jogadorId },
    include: {
      partida: true
    },
  });
}

export async function listarEstatisticasDoJogador(jogadorId: number) {
  return prisma.estatistica.findMany({
    where: { jogadorId },
    include: { 
      partida: true 
    }
  });
}