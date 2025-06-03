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
exports.listarJogadoresDaPartida = listarJogadoresDaPartida;
const client_1 = require("@prisma/client");
const partidaRepository = __importStar(require("../repository/partida.repository"));
const prisma = new client_1.PrismaClient();
async function listar() {
    try {
        return await partidaRepository.listar();
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao listar partida: ${error}`);
    }
}
async function buscarPorId(id) {
    try {
        return await partidaRepository.buscarPorId(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao buscar partida por ID: ${error}`);
    }
}
async function criar(data) {
    try {
        return await partidaRepository.criar(data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao criar partida: ${error}`);
    }
}
async function atualizar(id, data) {
    try {
        return await partidaRepository.atualizar(id, data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao atualizar partida: ${error}`);
    }
}
async function deletar(id) {
    try {
        return await partidaRepository.deletar(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao deletar partida: ${error}`);
    }
}
async function listarJogadoresDaPartida(partidaId) {
    return await partidaRepository.listarJogadoresDaPartida(partidaId);
}
