import { Request, Response } from 'express';

// Controller para rotas básicas de home
export function index(req: Request, res: Response) {
  res.status(200).json({ mensagem: 'Bem-vindo à API Futebol Semanal!' });
}

export function privacy(req: Request, res: Response) {
  res.status(200).json({ mensagem: 'Política de Privacidade: Seus dados estão protegidos.' });
}

export function error(req: Request, res: Response) {
  const requestId = req.headers['x-request-id'] || req.id || null;
  res.status(500).json({ mensagem: 'Ocorreu um erro.', requestId });
}
