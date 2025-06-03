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
const estatisticaService = __importStar(require("../services/estatistica.service"));
async function listar(req, res) {
    try {
        const estatisticas = await estatisticaService.listar();
        res.status(200).json(estatisticas);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar estatísticas', erro: error });
    }
}
async function buscarPorId(req, res) {
    try {
        const id = Number(req.params.id);
        const estatistica = await estatisticaService.buscarPorId(id);
        if (!estatistica)
            res.status(404).json({ mensagem: 'Estatística não encontrada' });
        res.status(200).json(estatistica);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar estatística por ID', erro: error });
    }
}
async function criar(req, res) {
    try {
        const estatistica = await estatisticaService.criar(req.body);
        res.status(201).json(estatistica);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar estatística', erro: error });
    }
}
async function atualizar(req, res) {
    try {
        const id = Number(req.params.id);
        const estatisticaAtualizada = await estatisticaService.atualizar(id, req.body);
        if (!estatisticaAtualizada) {
            return res.status(404).json({ mensagem: 'Estatística não encontrada' });
        }
        res.status(200).json(estatisticaAtualizada);
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar estatística', erro: error });
    }
}
async function deletar(req, res) {
    try {
        const id = Number(req.params.id);
        const deletado = await estatisticaService.deletar(id);
        if (!deletado)
            res.status(404).json({ mensagem: 'Estatística não encontrada para deletar' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar estatística', erro: error });
    }
}
