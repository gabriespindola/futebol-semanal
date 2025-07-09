import { Client } from 'pg';

export async function seed() {
  const client = new Client({
    user: 'eduardomatuella', // ajuste conforme seu usuário
    host: 'localhost', // ajuste conforme seu host
    database: 'postgres', // ajuste conforme seu banco
    password: 'sua_senha', // ajuste conforme sua senha
    port: 5432, // ajuste conforme sua porta
  });

  await client.connect();

  try {
    // Limpar tabelas (ordem reversa das dependências)
    await client.query('DELETE FROM "Partidas"');
    await client.query('DELETE FROM "Jogadores"');
    await client.query('DELETE FROM "Times"');
    await client.query('DELETE FROM "Usuarios"');

    // Inserir usuários
    const usuarios = [
      ['João Silva', 'joao@email.com', 'senha123', '11999999999', new Date(), null, true],
      ['Maria Souza', 'maria@email.com', 'senha456', '21988888888', new Date(), null, true],
    ];
    const usuarioIds = [];
    for (const u of usuarios) {
      const res = await client.query(
        'INSERT INTO "Usuarios" ("Nome", "Email", "Senha", "Telefone", "DataCadastro", "UltimoLogin", "Ativo") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "Id"',
        u
      );
      usuarioIds.push(res.rows[0].Id);
    }

    // Inserir times
    const times = [
      ['Tigres FC', 'Amarelo', 'São Paulo', 'SP', '2001-05-10', usuarioIds[0], ''],
      ['Leões FC', 'Azul', 'Rio de Janeiro', 'RJ', '1999-08-20', usuarioIds[1], ''],
    ];
    const timeIds = [];
    for (const t of times) {
      const res = await client.query(
        'INSERT INTO "Times" ("Nome", "CorUniforme", "Cidade", "Estado", "Fundacao", "UsuarioId", "FotoUrl") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "Id"',
        t
      );
      timeIds.push(res.rows[0].Id);
    }

    // Inserir jogadores
    const jogadores = [
      ['Carlos', null, '1995-03-15', 1.80, 75, 'Atacante', 9, timeIds[0], usuarioIds[0]],
      ['Pedro', null, '1998-07-22', 1.75, 70, 'Goleiro', 1, timeIds[1], usuarioIds[1]],
    ];
    for (const j of jogadores) {
      await client.query(
        'INSERT INTO "Jogadores" ("Nome", "ImagemUrl", "DataNascimento", "Altura", "Peso", "Posicao", "NumeroCamisa", "TimeId", "UsuarioId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
        j
      );
    }

    // Inserir partidas
    const partidas = [
      [
        'Estádio Municipal',
        new Date(),
        'Ensolarado',
        'Campeonato Brasileiro',
        timeIds[0],
        timeIds[1],
        2,
        1,
      ],
    ];
    for (const p of partidas) {
      await client.query(
        'INSERT INTO "Partidas" ("Local", "DataHora", "CondicoesClimaticas", "Campeonato", "TimeCasaId", "TimeVisitanteId", "PlacarCasa", "PlacarVisitante") VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
        p
      );
    }

    console.log('Seed realizado com sucesso!');
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  } finally {
    await client.end();
  }
}

seed();
