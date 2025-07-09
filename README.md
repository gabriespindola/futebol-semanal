# Futebol Semanal API

API REST para gerenciamento de dados de futebol, incluindo times, jogadores, partidas, estatísticas e usuários.

## 📋 Sumário

- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Rotas da API](#rotas-da-api)
  - [Usuários](#usuários)
  - [Times](#times)
  - [Jogadores](#jogadores)
  - [Partidas](#partidas)
  - [Estatísticas](#estatísticas)
- [Autenticação](#autenticação)
- [Testes](#testes)

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- Jest (Testes)

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd futebol-semanal

# Instale as dependências
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto:

```env
POSTGRES_CONNECTION=postgresql://postgres:password@localhost:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-here
```

2. Configure o banco de dados PostgreSQL
3. Execute as migrações (se houver)

## 🎯 Rotas da API

### Usuários

Base URL: `/usuarios`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todos os usuários | ✅ |
| GET | `/:id` | Buscar usuário por ID | ✅ |
| PATCH | `/:id` | Atualizar usuário parcialmente | ✅ |
| DELETE | `/:id` | Deletar usuário | ✅ |
| POST | `/register` | Registrar novo usuário | ❌ |
| POST | `/login` | Login de usuário | ❌ |

#### Exemplos de Uso

**Registrar usuário:**
```http
POST /usuarios/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "telefone": "11999999999"
}
```

**Login:**
```http
POST /usuarios/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta do Login:**
```json
{
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999999999"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Times

Base URL: `/times`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todos os times | ✅ |
| GET | `/:id` | Buscar time por ID | ✅ |
| POST | `/` | Criar novo time | ✅ |
| PUT | `/:id` | Atualizar time | ✅ |
| DELETE | `/:id` | Deletar time | ✅ |

#### Exemplo de Uso

**Criar time:**
```http
POST /times
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Flamengo",
  "cidade": "Rio de Janeiro",
  "fundacao": "1895"
}
```

### Jogadores

Base URL: `/jogadores`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todos os jogadores | ✅ |
| GET | `/:id` | Buscar jogador por ID | ✅ |
| POST | `/` | Criar novo jogador | ✅ |
| PUT | `/:id` | Atualizar jogador | ✅ |
| DELETE | `/:id` | Deletar jogador | ✅ |

#### Exemplo de Uso

**Criar jogador:**
```http
POST /jogadores
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Gabriel Barbosa",
  "posicao": "Atacante",
  "idade": 27,
  "time_id": 1
}
```

### Partidas

Base URL: `/partidas`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todas as partidas | ✅ |
| GET | `/:id` | Buscar partida por ID | ✅ |
| POST | `/` | Criar nova partida | ✅ |
| PUT | `/:id` | Atualizar partida | ✅ |
| DELETE | `/:id` | Deletar partida | ✅ |

#### Exemplo de Uso

**Criar partida:**
```http
POST /partidas
Authorization: Bearer <token>
Content-Type: application/json

{
  "time_casa": "Flamengo",
  "time_visitante": "Vasco",
  "placar_casa": 2,
  "placar_visitante": 1,
  "data": "2023-12-15T20:00:00Z"
}
```

### Estatísticas

Base URL: `/estatisticas`

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/` | Listar todas as estatísticas | ✅ |
| GET | `/:id` | Buscar estatística por ID | ✅ |
| POST | `/` | Criar nova estatística | ✅ |
| PUT | `/:id` | Atualizar estatística | ✅ |
| DELETE | `/:id` | Deletar estatística | ✅ |

#### Exemplo de Uso

**Criar estatística:**
```http
POST /estatisticas
Authorization: Bearer <token>
Content-Type: application/json

{
  "jogador_id": 1,
  "partida_id": 1,
  "gols": 2,
  "assistencias": 1,
  "cartoes_amarelos": 0,
  "cartoes_vermelhos": 0
}
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. 

### Como usar:

1. **Registre-se** usando o endpoint `/usuarios/register`
2. **Faça login** usando o endpoint `/usuarios/login` para obter o token
3. **Inclua o token** no header `Authorization` das requisições protegidas:

```http
Authorization: Bearer <seu-token-jwt>
```

### Rotas Públicas:
- `POST /usuarios/register`
- `POST /usuarios/login`

### Rotas Protegidas:
- Todas as outras rotas requerem autenticação

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build do projeto
npm run build

# Executar em produção
npm start

# Limpar pasta dist
npm run clear

# Testes
npm test
npm run test:watch
npm run test:coverage
```

## 📝 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 204 | Deletado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 👥 Autores

- Gabriel Espindola
- Eduardo Matuella

## 📄 Licença

Este projeto está sob a licença ISC.