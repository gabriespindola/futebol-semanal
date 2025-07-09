import { Request, Response } from 'express';
import * as jogadorService from '../services/jogador.service';
import * as jogadorController from '../controllers/jogador.controller';

// Mock do service
jest.mock('../services/jogador.service');
const mockedJogadorService = jogadorService as jest.Mocked<typeof jogadorService>;

describe('Jogador Controller', () => {
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
    it('deve retornar todos os jogadores', async () => {
      const mockJogadores = [
        { id: 1, nome: 'João Silva', posicao: 'Atacante' },
        { id: 2, nome: 'Maria Santos', posicao: 'Meio-campo' }
      ];
      mockedJogadorService.listar.mockResolvedValue(mockJogadores);

      await jogadorController.listar(req as Request, res as Response);

      expect(mockedJogadorService.listar).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockJogadores);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar jogador quando encontrado', async () => {
      const mockJogador = { id: 1, nome: 'João Silva', posicao: 'Atacante' };
      req.params = { id: '1' };
      mockedJogadorService.buscarPorId.mockResolvedValue(mockJogador);

      await jogadorController.buscarPorId(req as Request, res as Response);

      expect(mockedJogadorService.buscarPorId).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockJogador);
    });

    it('deve retornar 404 quando jogador não for encontrado', async () => {
      req.params = { id: '999' };
      mockedJogadorService.buscarPorId.mockResolvedValue(null);

      await jogadorController.buscarPorId(req as Request, res as Response);

      expect(mockedJogadorService.buscarPorId).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Jogador não encontrado' });
    });
  });

  describe('criar', () => {
    it('deve criar um novo jogador', async () => {
      const novoJogador = { nome: 'Pedro Costa', posicao: 'Goleiro' };
      const jogadorCriado = { id: 1, nome: 'Pedro Costa', posicao: 'Goleiro' };
      req.body = novoJogador;
      mockedJogadorService.criar.mockResolvedValue(jogadorCriado);

      await jogadorController.criar(req as Request, res as Response);

      expect(mockedJogadorService.criar).toHaveBeenCalledWith(novoJogador);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(jogadorCriado);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um jogador existente', async () => {
      const dadosAtualizacao = { nome: 'João Silva Jr.', posicao: 'Atacante' };
      const jogadorAtualizado = { id: 1, nome: 'João Silva Jr.', posicao: 'Atacante' };
      req.params = { id: '1' };
      req.body = dadosAtualizacao;
      mockedJogadorService.atualizar.mockResolvedValue(jogadorAtualizado);

      await jogadorController.atualizar(req as Request, res as Response);

      expect(mockedJogadorService.atualizar).toHaveBeenCalledWith(1, dadosAtualizacao);
      expect(res.json).toHaveBeenCalledWith(jogadorAtualizado);
    });
  });

  describe('deletar', () => {
    it('deve deletar um jogador', async () => {
      req.params = { id: '1' };
      mockedJogadorService.deletar.mockResolvedValue(true);

      await jogadorController.deletar(req as Request, res as Response);

      expect(mockedJogadorService.deletar).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});