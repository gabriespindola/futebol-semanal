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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listar = listar;
exports.buscarPorId = buscarPorId;
exports.criar = criar;
exports.atualizar = atualizar;
exports.deletar = deletar;
exports.listarPartidasDoJogador = listarPartidasDoJogador;
exports.listarEstatisticasDoJogador = listarEstatisticasDoJogador;
const client_1 = require("@prisma/client");
const jogadorRepository = __importStar(require("../repository/jogador.repository"));
const prisma = new client_1.PrismaClient();
async function listar() {
    try {
        return await jogadorRepository.listar();
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao listar jogador: ${error}`);
    }
}
async function buscarPorId(id) {
    try {
        return await jogadorRepository.buscarPorId(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao buscar jogador por ID: ${error}`);
    }
}
async function criar(data) {
    try {
        return await jogadorRepository.criar(data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao criar jogador: ${error}`);
    }
}
async function atualizar(id, data) {
    try {
        return await jogadorRepository.atualizar(id, data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao atualizar jogador: ${error}`);
    }
}
async function deletar(id) {
    try {
        return await jogadorRepository.deletar(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao deletar jogador: ${error}`);
    }
}
async function listarPartidasDoJogador(jogadorId) {
    return await jogadorRepository.listarPartidasDoJogador(jogadorId);
}
async function listarEstatisticasDoJogador(jogadorId) {
    return await jogadorRepository.listarEstatisticasDoJogador(jogadorId);
}
