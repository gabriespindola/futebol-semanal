"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const jogador_routes_1 = __importDefault(require("../routes/jogador.routes"));
const auth_test_1 = require("./auth.test");
const token = (0, auth_test_1.gerarTokenFake)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/jogadores', jogador_routes_1.default);
describe('Rotas de Jogador', () => {
    it('GET /jogadores deve retornar todos os jogadores', async () => {
        const res = await (0, supertest_1.default)(app).get('/jogadores').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('POST /jogadores deve criar um jogador', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/jogadores')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: 'Jogador Teste' });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('Jogador Teste');
    });
    it('GET /jogadores/:id deve retornar um jogador', async () => {
        const novo = await (0, supertest_1.default)(app)
            .post('/jogadores')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: 'Jogador Teste 2' });
        const id = novo.body.id;
        const res = await (0, supertest_1.default)(app).get(`/jogadores/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', id);
    });
});
