"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const partida_routes_1 = __importDefault(require("../routes/partida.routes"));
const auth_test_1 = require("./auth.test");
const token = (0, auth_test_1.gerarTokenFake)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/partidas', partida_routes_1.default);
describe('Rotas de Partida', () => {
    it('GET /partidas deve retornar todas as partidas', async () => {
        const res = await (0, supertest_1.default)(app)
            .get('/partidas')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('POST /partidas deve criar uma partida', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/partidas')
            .set('Authorization', `Bearer ${token}`)
            .send({ data: new Date().toISOString(), local: 'Estádio Teste' });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.local).toBe('Estádio Teste');
    });
    it('GET /partidas/:id deve retornar uma partida', async () => {
        // Cria uma partida antes de buscar
        const nova = await (0, supertest_1.default)(app)
            .post('/partidas')
            .set('Authorization', `Bearer ${token}`)
            .send({ data: new Date().toISOString(), local: 'Estádio Teste 2' });
        const id = nova.body.id;
        const res = await (0, supertest_1.default)(app)
            .get(`/partidas/${id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', id);
    });
});
