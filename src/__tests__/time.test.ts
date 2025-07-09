import { Request, Response } from 'express';
import * as timesService from '../services/times.service';
import * as timesController from '../controllers/times.controller';

// Mock do service
jest.mock('../services/times.service');
const mockedTimesService = timesService as jest.Mocked<typeof timesService>;

describe('Times Controller', () => {
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
    it('deve retornar todos os times', async () => {
      const mockTimes = [
        { id: 1, nome: 'Flamengo', cidade: 'Rio de Janeiro', fundacao: '1895' },
        { id: 2, nome: 'Corinthians', cidade: 'São Paulo', fundacao: '1910' }
      ];
      mockedTimesService.listar.mockResolvedValue(mockTimes);

      await timesController.listar(req as Request, res as Response);

      expect(mockedTimesService.listar).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockTimes);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar time quando encontrado', async () => {
      const mockTime = { id: 1, nome: 'Flamengo', cidade: 'Rio de Janeiro', fundacao: '1895' };
      req.params = { id: '1' };
      mockedTimesService.buscarPorId.mockResolvedValue(mockTime);

      await timesController.buscarPorId(req as Request, res as Response);

      expect(mockedTimesService.buscarPorId).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockTime);
    });

    it('deve retornar 404 quando time não for encontrado', async () => {
      req.params = { id: '999' };
      mockedTimesService.buscarPorId.mockResolvedValue(null);

      await timesController.buscarPorId(req as Request, res as Response);

      expect(mockedTimesService.buscarPorId).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Time não encontrado' });
    });
  });

  describe('criar', () => {
    it('deve criar um novo time', async () => {
      const novoTime = { nome: 'Palmeiras', cidade: 'São Paulo', fundacao: '1914' };
      const timeCriado = { id: 1, nome: 'Palmeiras', cidade: 'São Paulo', fundacao: '1914' };
      req.body = novoTime;
      mockedTimesService.criar.mockResolvedValue(timeCriado);

      await timesController.criar(req as Request, res as Response);

      expect(mockedTimesService.criar).toHaveBeenCalledWith(novoTime);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(timeCriado);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um time existente', async () => {
      const dadosAtualizacao = { nome: 'Clube de Regatas do Flamengo', cidade: 'Rio de Janeiro' };
      const timeAtualizado = { id: 1, nome: 'Clube de Regatas do Flamengo', cidade: 'Rio de Janeiro', fundacao: '1895' };
      req.params = { id: '1' };
      req.body = dadosAtualizacao;
      mockedTimesService.atualizar.mockResolvedValue(timeAtualizado);

      await timesController.atualizar(req as Request, res as Response);

      expect(mockedTimesService.atualizar).toHaveBeenCalledWith(1, dadosAtualizacao);
      expect(res.json).toHaveBeenCalledWith(timeAtualizado);
    });
  });

  describe('deletar', () => {
    it('deve deletar um time', async () => {
      req.params = { id: '1' };
      mockedTimesService.deletar.mockResolvedValue(true);

      await timesController.deletar(req as Request, res as Response);

      expect(mockedTimesService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});