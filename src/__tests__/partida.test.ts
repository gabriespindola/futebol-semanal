import request from 'supertest';
import express from 'express';
import partidaRoutes from '../routes/partida.routes';
import { gerarTokenFake } from './auth.test'

const token = gerarTokenFake()

const app = express();
app.use(express.json());
app.use('/partidas', partidaRoutes);

describe('Rotas de Partida', () => {
  it('GET /partidas deve retornar todas as partidas', async () => {
    const res = await request(app)
      .get('/partidas')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /partidas deve criar uma partida', async () => {
    const res = await request(app)
      .post('/partidas')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: new Date().toISOString(), local: 'Estádio Teste' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.local).toBe('Estádio Teste');
  });

  it('GET /partidas/:id deve retornar uma partida', async () => {
    // Cria uma partida antes de buscar
    const nova = await request(app)
      .post('/partidas')
      .set('Authorization', `Bearer ${token}`)
      .send({ data: new Date().toISOString(), local: 'Estádio Teste 2' });
    const id = nova.body.id;

    const res = await request(app)
      .get(`/partidas/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', id);
  });
});