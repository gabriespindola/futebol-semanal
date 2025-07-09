import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { autenticar, realizaLog } from '../middlewares/auth.middleware';

// Mock do jwt
jest.mock('jsonwebtoken');
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('Middleware de Autenticação', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('autenticar', () => {
    it('deve chamar next() com token válido', () => {
      const token = 'valid-token';
      const decoded = { id: 1, email: 'test@test.com' };
      
      req.headers = { authorization: `Bearer ${token}` };
      mockedJwt.verify.mockReturnValue(decoded as any);

      autenticar(req as Request, res as Response, next);

      expect(mockedJwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET || 'FULLSTACK');
      expect(req.user).toEqual(decoded);
      expect(next).toHaveBeenCalled();
    });

    it('deve retornar 401 quando token não é fornecido', () => {
      req.headers = {};

      autenticar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token não fornecido' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar 401 quando authorization header não tem Bearer', () => {
      req.headers = { authorization: 'invalid-format' };

      autenticar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token não fornecido' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar 401 quando token é inválido', () => {
      const token = 'invalid-token';
      
      req.headers = { authorization: `Bearer ${token}` };
      mockedJwt.verify.mockImplementation(() => {
        throw new Error('Token inválido');
      });

      autenticar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});

describe('Middleware de Log', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/test'
    };
    res = {};
    next = jest.fn();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('realizaLog', () => {
    it('deve logar a requisição e chamar next()', () => {
      const mockDate = new Date('2023-01-01T10:00:00.000Z');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      realizaLog(req as Request, res as Response, next);

      expect(consoleSpy).toHaveBeenCalledWith('[2023-01-01T10:00:00.000Z] GET /test');
      expect(next).toHaveBeenCalled();
    });

    it('deve logar diferentes métodos HTTP', () => {
      req.method = 'POST';
      req.originalUrl = '/users';

      realizaLog(req as Request, res as Response, next);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('POST /users'));
      expect(next).toHaveBeenCalled();
    });

    it('deve logar com timestamp atual', () => {
      realizaLog(req as Request, res as Response, next);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] GET \/test$/));
      expect(next).toHaveBeenCalled();
    });
  });
});