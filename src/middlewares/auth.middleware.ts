import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'FULLSTACK';
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export function autenticar(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
}

export function realizaLog(req: Request, res: Response, next: NextFunction): void {
    const dataHora = new Date().toISOString();
    console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
    next();
}