import { Request, Response } from 'express';
import * as partidaService from '../services/partida.service';
import * as partidaController from '../controllers/partida.controller';

// Mock do service
jest.mock('../services/partida.service');
const mockedPartidaService = partidaService as jest.Mocked<typeof partidaService>;

describe('Partida Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listar', () => {
    it('deve retornar todas as partidas', async () => {
      const mockPartidas = [
        { id: 1, time_casa: 'Flamengo', time_visitante: 'Vasco', placar_casa: 2, placar_visitante: 1 },
        { id: 2, time_casa: 'Corinthians', time_visitante: 'Palmeiras', placar_casa: 0, placar_visitante: 3 }
      ];
      mockedPartidaService.listar.mockResolvedValue(mockPartidas);

      await partidaController.listar(req as Request, res as Response);

      expect(mockedPartidaService.listar).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockPartidas);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar partida quando encontrada', async () => {
      const mockPartida = { id: 1, time_casa: 'Flamengo', time_visitante: 'Vasco', placar_casa: 2, placar_visitante: 1 };
      req.params = { id: '1' };
      mockedPartidaService.buscarPorId.mockResolvedValue(mockPartida);

      await partidaController.buscarPorId(req as Request, res as Response);

      expect(mockedPartidaService.buscarPorId).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockPartida);
    });

    it('deve retornar 404 quando partida não for encontrada', async () => {
      req.params = { id: '999' };
      mockedPartidaService.buscarPorId.mockResolvedValue(null);

      await partidaController.buscarPorId(req as Request, res as Response);

      expect(mockedPartidaService.buscarPorId).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Partida não encontrada' });
    });
  });

  describe('criar', () => {
    it('deve criar uma nova partida', async () => {
      const novaPartida = { time_casa: 'Santos', time_visitante: 'São Paulo', placar_casa: 1, placar_visitante: 2 };
      const partidaCriada = { id: 1, time_casa: 'Santos', time_visitante: 'São Paulo', placar_casa: 1, placar_visitante: 2 };
      req.body = novaPartida;
      mockedPartidaService.criar.mockResolvedValue(partidaCriada);

      await partidaController.criar(req as Request, res as Response);

      expect(mockedPartidaService.criar).toHaveBeenCalledWith(novaPartida);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(partidaCriada);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar uma partida existente', async () => {
      const dadosAtualizacao = { placar_casa: 3, placar_visitante: 1 };
      const partidaAtualizada = { id: 1, time_casa: 'Flamengo', time_visitante: 'Vasco', placar_casa: 3, placar_visitante: 1 };
      req.params = { id: '1' };
      req.body = dadosAtualizacao;
      mockedPartidaService.atualizar.mockResolvedValue(partidaAtualizada);

      await partidaController.atualizar(req as Request, res as Response);

      expect(mockedPartidaService.atualizar).toHaveBeenCalledWith(1, dadosAtualizacao);
      expect(res.json).toHaveBeenCalledWith(partidaAtualizada);
    });
  });

  describe('deletar', () => {
    it('deve deletar uma partida', async () => {
      req.params = { id: '1' };
      mockedPartidaService.deletar.mockResolvedValue(true);

      await partidaController.deletar(req as Request, res as Response);

      expect(mockedPartidaService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});