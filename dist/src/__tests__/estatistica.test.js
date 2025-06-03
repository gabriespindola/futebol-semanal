"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const estatistica_routes_1 = __importDefault(require("../routes/estatistica.routes"));
const auth_test_1 = require("./auth.test");
const token = (0, auth_test_1.gerarTokenFake)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/estatisticas', estatistica_routes_1.default);
describe('Rotas de Estatística', () => {
    let estatisticaId;
    it('GET /estatisticas deve retornar todas as estatísticas', async () => {
        const res = await (0, supertest_1.default)(app).get('/estatisticas').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('POST /estatisticas deve criar uma estatística', async () => {
        // Use IDs válidos do seu banco para jogadorId e partidaId!
        const res = await (0, supertest_1.default)(app)
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
        const res = await (0, supertest_1.default)(app).get(`/estatisticas/${estatisticaId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', estatisticaId);
    });
    it('PUT /estatisticas/:id deve atualizar uma estatística', async () => {
        const res = await (0, supertest_1.default)(app)
            .put(`/estatisticas/${estatisticaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ gols: 3, assistencias: 2 });
        expect(res.status).toBe(200);
        expect(res.body.gols).toBe(3);
        expect(res.body.assistencias).toBe(2);
    });
    it('DELETE /estatisticas/:id deve deletar uma estatística', async () => {
        const res = await (0, supertest_1.default)(app).delete(`/estatisticas/${estatisticaId}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(204);
    });
});
