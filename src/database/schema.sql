-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Times
CREATE TABLE IF NOT EXISTS times (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  corUniforme VARCHAR(50),
  cidade VARCHAR(100),
  estado VARCHAR(50),
  fundacao DATE,
  usuarioId INTEGER REFERENCES usuarios(id),
  fotoUrl VARCHAR(255)
);

-- Tabela de Jogadores
CREATE TABLE IF NOT EXISTS jogadores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  imagem VARCHAR(255)
);

-- Tabela de Partidas
CREATE TABLE IF NOT EXISTS partidas (
  id SERIAL PRIMARY KEY,
  dataPartida DATE NOT NULL,
  local VARCHAR(100),
  timeAId INTEGER REFERENCES times(id),
  timeBId INTEGER REFERENCES times(id)
);

-- Tabela de Estatísticas
CREATE TABLE IF NOT EXISTS estatisticas (
  id SERIAL PRIMARY KEY,
  jogadorId INTEGER REFERENCES jogadores(id),
  partidaId INTEGER REFERENCES partidas(id),
  gols INTEGER DEFAULT 0,
  assistencias INTEGER DEFAULT 0
);
