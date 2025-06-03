"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const jogador_routes_1 = __importDefault(require("./routes/jogador.routes"));
const partida_routes_1 = __importDefault(require("./routes/partida.routes"));
const estatistica_routes_1 = __importDefault(require("./routes/estatistica.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(auth_middleware_1.realizaLog);
app.use('/jogadores', auth_middleware_1.autenticar, jogador_routes_1.default);
app.use('/partidas', auth_middleware_1.autenticar, partida_routes_1.default);
app.use('/estatisticas', auth_middleware_1.autenticar, estatistica_routes_1.default);
app.use('/auth', auth_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
