import { Client } from 'pg';

async function cleanDb() {
  const client = new Client({
    user: 'eduardomatuella', // ajuste conforme seu usuário
    host: 'localhost', // ajuste conforme seu host
    database: 'postgres', // ajuste conforme seu banco
    password: 'sua_senha', // ajuste conforme sua senha
    port: 5432, // ajuste conforme sua porta
  });

  await client.connect();

  try {
    // Ordem reversa das dependências para evitar erros de FK
    await client.query('DELETE FROM "Partidas"');
    await client.query('DELETE FROM "Jogadores"');
    await client.query('DELETE FROM "Times"');
    await client.query('DELETE FROM "Usuarios"');
    console.log('Banco limpo com sucesso!');
  } catch (err) {
    console.error('Erro ao limpar banco:', err);
  } finally {
    await client.end();
  }
}

cleanDb();
