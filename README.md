# Futebol Semanal API

API REST para gerenciamento de jogadores, partidas e estatísticas de futebol amador.  
Desenvolvida em Node.js, Express, TypeScript e Prisma ORM.

---

## Funcionalidades

- Cadastro e autenticação de usuários (JWT)
- CRUD de jogadores
- CRUD de partidas
- CRUD de estatísticas (gols, assistências, etc)
- Upload de imagem de jogador
- Relacionamento entre jogadores, partidas e estatísticas

---

## Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite (desenvolvimento) / PostgreSQL (produção)
- JWT para autenticação
- Railway (deploy)

---

## Instalação e Uso Local

1. **Clone o repositório**
   ```sh
   git clone https://github.com/seu-usuario/futebol-semanal.git
   cd futebol-semanal
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Rode as migrations e gere o Prisma Client**
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Inicie o servidor**
   ```sh
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000`

---

## Rotas Principais

### Autenticação

- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login (retorna token JWT)

### Jogadores

- `GET /jogadores` — Lista todos os jogadores
- `GET /jogadores/:id` — Busca jogador por ID
- `POST /jogadores` — Cria jogador (com upload de imagem)
- `PUT /jogadores/:id` — Atualiza jogador
- `DELETE /jogadores/:id` — Remove jogador
- `GET /jogadores/:id/partidas` — Lista partidas do jogador
- `GET /jogadores/:id/estatisticas` — Lista estatísticas do jogador

### Partidas

- `GET /partidas` — Lista todas as partidas
- `GET /partidas/:id` — Busca partida por ID
- `POST /partidas` — Cria partida
- `PUT /partidas/:id` — Atualiza partida
- `DELETE /partidas/:id` — Remove partida
- `GET /partidas/:id/jogadores` — Lista jogadores da partida

### Estatísticas

- `GET /estatisticas` — Lista todas as estatísticas
- `GET /estatisticas/:id` — Busca estatística por ID
- `POST /estatisticas` — Cria estatística
- `PUT /estatisticas/:id` — Atualiza estatística
- `DELETE /estatisticas/:id` — Remove estatística

---

## Observações

- Para produção, recomenda-se usar PostgreSQL.
- O upload de imagens salva os arquivos localmente; para produção, considere usar um serviço externo (S3, Cloudinary, etc).
- Todas as rotas (exceto `/auth`) exigem autenticação via JWT.

---

## Licença

MIT

---

Desenvolvido por Eduardo Monteblanco Matuella e Gabriel Martins Espindola(https://github.com/gabriespindola, https://github.com/montwh1te)