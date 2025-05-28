import { Request, Response } from 'express';
import * as authServices from '../services/auth.services';

export async function register(req: Request, res: Response) {
    try {
        const usuario = await authServices.register(req.body);
        res.status(201).json(usuario);
    } catch (error: any) {
        res.status(400).json({ mensagem: error.message || 'Erro ao processar o registro' });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const resultado = await authServices.login(req.body);
        res.status(200).json(resultado);
    } catch (error: any) {
        res.status(401).json({ mensagem: error.message || 'Erro ao processar o login, usuário não autorizado' });
    }
}