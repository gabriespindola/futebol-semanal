"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticar = autenticar;
exports.realizaLog = realizaLog;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'FULLSTACK';
function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ mensagem: 'Token não fornecido' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
}
function realizaLog(req, res, next) {
    const dataHora = new Date().toISOString();
    console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
    next();
}
