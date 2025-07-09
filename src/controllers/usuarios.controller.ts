import * as usuariosService from '../services/usuarios.service';
import { Request, Response } from 'express';

export async function listar(req: Request, res: Response) {
  const result = await usuariosService.listar();
  res.json(result);
}

export async function buscarPorId(req: Request, res: Response) {
  const result = await usuariosService.buscarPorId(Number(req.params.id));
  if (!result) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(result);
}

export async function criar(req: Request, res: Response) {
  const result = await usuariosService.criar(req.body);
  res.status(201).json(result);
}

export async function atualizarParcial(req: Request, res: Response) {
  const result = await usuariosService.atualizarParcial(Number(req.params.id), req.body);
  res.json(result);
}

export async function deletar(req: Request, res: Response) {
  await usuariosService.deletar(Number(req.params.id));
  res.status(204).send();
}

export async function register(req: Request, res: Response) {
  const result = await usuariosService.register(req.body);
  res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const result = await usuariosService.login(req.body);
  res.json(result);
}
