import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'FULLSTACK';

export function autenticar( req: Request, res: Response, next: NextFunction ): void {
  // ajeitar para receber token da req e validar aqui no backend
}

export function realizaLog(req: Request, res: Response, next: NextFunction): void {
    const dataHora = new Date().toISOString();
    console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
    next();
}