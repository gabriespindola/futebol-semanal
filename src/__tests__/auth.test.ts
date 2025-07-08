import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'FULLSTACK';

export function gerarTokenFake() {
  return jwt.sign({ id: 1, email: 'admin@email.com', nome: 'admin' }, SECRET, { expiresIn: '1h' });
}

// ----------------------- ** ----------------------------- //

import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth.routes';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Rotas de Auth', () => {
  const email = `user${Date.now()}@email.com`;
  const senha = '123456';
  const nome = 'Usuário Teste';

  it('POST /auth/register deve registrar um novo usuário', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email, senha, nome });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', email);
    expect(res.body).toHaveProperty('nome', nome);
  });

  it('POST /auth/login deve autenticar e retornar um token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email, senha });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });

  it('POST /auth/login deve falhar com senha errada', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email, senha: 'errada' });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('mensagem');
  });
});