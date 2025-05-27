import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'FULLSTACK';

export default function autenticar( req: Request, res: Response, next: NextFunction ): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ mensagem: 'Token não fornecido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, SECRET);
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
}