import request from 'supertest';
import express from 'express';
import estatisticaRoutes from '../routes/estatistica.routes';
import { gerarTokenFake } from './auth.test'

const token = gerarTokenFake();

const app = express();
app.use(express.json());
app.use('/estatisticas', estatisticaRoutes);

describe('Rotas de Estatística', () => {
  let estatisticaId: number;

  it('GET /estatisticas deve retornar todas as estatísticas', async () => {
    const res = await request(app).get('/estatisticas').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /estatisticas deve criar uma estatística', async () => {
    // Use IDs válidos do seu banco para jogadorId e partidaId!
    const res = await request(app)
      .post('/estatisticas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        jogadorId: 1,
        partidaId: 1,
        gols: 2,
        assistencias: 1
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    estatisticaId = res.body.id;
  });

  it('GET /estatisticas/:id deve retornar uma estatística', async () => {
    const res = await request(app).get(`/estatisticas/${estatisticaId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', estatisticaId);
  });

  it('PUT /estatisticas/:id deve atualizar uma estatística', async () => {
    const res = await request(app)
      .put(`/estatisticas/${estatisticaId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ gols: 3, assistencias: 2 });
    expect(res.status).toBe(200);
    expect(res.body.gols).toBe(3);
    expect(res.body.assistencias).toBe(2);
  });

  it('DELETE /estatisticas/:id deve deletar uma estatística', async () => {
    const res = await request(app).delete(`/estatisticas/${estatisticaId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});