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
const partidaService = __importStar(require("../services/partida.service"));
async function listar(req, res) {
    try {
        const partidas = await partidaService.listar();
        res.status(200).json(partidas);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar partidas', erro: error });
    }
}
async function buscarPorId(req, res) {
    try {
        const id = Number(req.params.id);
        const partida = await partidaService.buscarPorId(id);
        if (!partida)
            res.status(404).json({ mensagem: 'Partida não encontrada' });
        res.status(200).json(partida);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar partida por ID', erro: error });
    }
}
async function criar(req, res) {
    try {
        const partida = await partidaService.criar(req.body);
        res.status(201).json(partida);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar partida', erro: error });
    }
}
async function atualizar(req, res) {
    try {
        const id = Number(req.params.id);
        const atualizado = await partidaService.atualizar(id, req.body);
        if (!atualizado)
            res.status(404).json({ mensagem: 'Partida não encontrada para atualizar' });
        res.status(200).json({ mensagem: 'Partida atualizada', atualizado });
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar partida', erro: error });
    }
}
async function deletar(req, res) {
    try {
        const id = Number(req.params.id);
        const deletado = await partidaService.deletar(id);
        if (!deletado)
            res.status(404).json({ mensagem: 'Partida não encontrada para deletar' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar partida', erro: error });
    }
}
async function listarJogadoresDaPartida(req, res) {
    try {
        const id = Number(req.params.id);
        const jogadores = await partidaService.listarJogadoresDaPartida(id);
        res.status(200).json(jogadores);
    }
    catch (error) {
        res.status(500).json({ mensagem: error.message || 'Erro ao buscar jogadores da partida' });
    }
}
