"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarTokenFake = gerarTokenFake;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'FULLSTACK';
function gerarTokenFake() {
    return jsonwebtoken_1.default.sign({ id: 1, email: 'admin@email.com', nome: 'admin' }, SECRET, { expiresIn: '1h' });
}
// ----------------------- ** ----------------------------- //
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.default);
describe('Rotas de Auth', () => {
    const email = `user${Date.now()}@email.com`;
    const senha = '123456';
    const nome = 'Usuário Teste';
    it('POST /auth/register deve registrar um novo usuário', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ email, senha, nome });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', email);
        expect(res.body).toHaveProperty('nome', nome);
    });
    it('POST /auth/login deve autenticar e retornar um token', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email, senha });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toBe('string');
    });
    it('POST /auth/login deve falhar com senha errada', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email, senha: 'errada' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('mensagem');
    });
});
