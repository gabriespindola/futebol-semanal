import { Request, Response, NextFunction } from 'express';

export default function autenticar(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const tokenEsperado = process.env.AUTH_TOKEN || 'FULLSTACK';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensagem: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (token !== tokenEsperado) {
    res.status(401).json({ mensagem: 'Token inválido' });
    return;
  }

  next();
}