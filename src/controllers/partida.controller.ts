import * as partidaService from '../services/partida.service';
import { Request, Response } from 'express';

export async function listar(req: Request, res: Response) {
  const result = await partidaService.listar();
  res.json(result);
}

export async function buscarPorId(req: Request, res: Response) {
  const result = await partidaService.buscarPorId(Number(req.params.id));
  if (!result) return res.status(404).json({ message: 'Partida não encontrada' });
  res.json(result);
}

export async function criar(req: Request, res: Response) {
  const result = await partidaService.criar(req.body);
  res.status(201).json(result);
}

export async function atualizar(req: Request, res: Response) {
  const result = await partidaService.atualizar(Number(req.params.id), req.body);
  res.json(result);
}

export async function deletar(req: Request, res: Response) {
  await partidaService.deletar(Number(req.params.id));
  res.status(204).send();
}
