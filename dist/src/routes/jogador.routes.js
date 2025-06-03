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
const express_1 = require("express");
const jogadorController = __importStar(require("../controllers/jogador.controller"));
// import upload from '../middlewares/upload.middleware';
const router = (0, express_1.Router)();
router.get('/', (req, res) => jogadorController.listar(req, res));
router.get('/:id', (req, res) => jogadorController.buscarPorId(req, res));
// router.post('/', upload.single('imagem'), (req: any, res: any) => jogadorController.criar(req, res));
router.put('/:id', (req, res) => jogadorController.atualizar(req, res));
router.delete('/:id', (req, res) => jogadorController.deletar(req, res));
router.get('/:id/partidas', (req, res) => jogadorController.listarPartidasDoJogador(req, res));
router.get('/:id/estatisticas', (req, res) => jogadorController.listarEstatisticasDoJogador(req, res));
exports.default = router;
