"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRepository = __importStar(require("../repository/auth.repository"));
const prisma = new client_1.PrismaClient();
const SECRET = process.env.JWT_SECRET || 'FULLSTACK';
async function register(data) {
    try {
        const usuarioExistente = await authRepository.encontrarPorEmail(data.email);
        if (usuarioExistente) {
            throw new Error('E-mail já cadastrado');
        }
        const senhaHash = await bcryptjs_1.default.hash(data.senha, 10);
        const usuario = await authRepository.criarUsuario({
            email: data.email,
            senha: senhaHash,
            nome: data.nome,
        });
        return { id: usuario.id, email: usuario.email, nome: usuario.nome };
    }
    catch (error) {
        throw error;
    }
}
async function login(data) {
    try {
        const usuario = await authRepository.encontrarPorEmail(data.email);
        if (!usuario) {
            throw new Error('Usuário ou senha inválidos');
        }
        const senhaValida = await bcryptjs_1.default.compare(data.senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha inválidos');
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email, nome: usuario.nome }, SECRET, { expiresIn: '1h' });
        return { token };
    }
    catch (error) {
        throw error;
    }
}
