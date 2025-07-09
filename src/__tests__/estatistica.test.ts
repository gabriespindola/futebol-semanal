import { Request, Response } from 'express';
import * as estatisticaService from '../services/estatistica.service';
import * as estatisticaController from '../controllers/estatistica.controller';

// Mock do service
jest.mock('../services/estatistica.service');
const mockedEstatisticaService = estatisticaService as jest.Mocked<typeof estatisticaService>;

describe('Estatística Controller', () => {
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
    it('deve retornar todas as estatísticas', async () => {
      const mockEstatisticas = [
        { id: 1, nome: 'Estatística 1' },
        { id: 2, nome: 'Estatística 2' }
      ];
      mockedEstatisticaService.listar.mockResolvedValue(mockEstatisticas);

      await estatisticaController.listar(req as Request, res as Response);

      expect(mockedEstatisticaService.listar).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockEstatisticas);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar estatística quando encontrada', async () => {
      const mockEstatistica = { id: 1, nome: 'Estatística 1' };
      req.params = { id: '1' };
      mockedEstatisticaService.buscarPorId.mockResolvedValue(mockEstatistica);

      await estatisticaController.buscarPorId(req as Request, res as Response);

      expect(mockedEstatisticaService.buscarPorId).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockEstatistica);
    });

    it('deve retornar 404 quando estatística não for encontrada', async () => {
      req.params = { id: '999' };
      mockedEstatisticaService.buscarPorId.mockResolvedValue(null);

      await estatisticaController.buscarPorId(req as Request, res as Response);

      expect(mockedEstatisticaService.buscarPorId).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Estatística não encontrada' });
    });
  });

  describe('criar', () => {
    it('deve criar uma nova estatística', async () => {
      const novaEstatistica = { nome: 'Nova Estatística' };
      const estatisticaCriada = { id: 1, nome: 'Nova Estatística' };
      req.body = novaEstatistica;
      mockedEstatisticaService.criar.mockResolvedValue(estatisticaCriada);

      await estatisticaController.criar(req as Request, res as Response);

      expect(mockedEstatisticaService.criar).toHaveBeenCalledWith(novaEstatistica);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(estatisticaCriada);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar uma estatística existente', async () => {
      const dadosAtualizacao = { nome: 'Estatística Atualizada' };
      const estatisticaAtualizada = { id: 1, nome: 'Estatística Atualizada' };
      req.params = { id: '1' };
      req.body = dadosAtualizacao;
      mockedEstatisticaService.atualizar.mockResolvedValue(estatisticaAtualizada);

      await estatisticaController.atualizar(req as Request, res as Response);

      expect(mockedEstatisticaService.atualizar).toHaveBeenCalledWith(1, dadosAtualizacao);
      expect(res.json).toHaveBeenCalledWith(estatisticaAtualizada);
    });
  });

  describe('deletar', () => {
    it('deve deletar uma estatística', async () => {
      req.params = { id: '1' };
      mockedEstatisticaService.deletar.mockResolvedValue(true);

      await estatisticaController.deletar(req as Request, res as Response);

      expect(mockedEstatisticaService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});