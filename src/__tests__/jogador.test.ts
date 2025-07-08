import request from 'supertest';
import express from 'express';
import jogadorRoutes from '../routes/jogador.routes';
import { gerarTokenFake } from './auth.test'

const token = gerarTokenFake();

const app = express();
app.use(express.json());
app.use('/jogadores', jogadorRoutes);


describe('Rotas de Jogador', () => {
  it('GET /jogadores deve retornar todos os jogadores', async () => {
    const res = await request(app).get('/jogadores').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /jogadores deve criar um jogador', async () => {
    const res = await request(app)
      .post('/jogadores')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Jogador Teste' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Jogador Teste');
  });

  it('GET /jogadores/:id deve retornar um jogador', async () => {
    const novo = await request(app)
      .post('/jogadores')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Jogador Teste 2' });
    const id = novo.body.id;

    const res = await request(app).get(`/jogadores/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', id);
  });
});