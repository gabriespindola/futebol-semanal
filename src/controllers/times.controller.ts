import * as timesService from '../services/times.service';
import { Request, Response } from 'express';

export async function listar(req: Request, res: Response) {
  const result = await timesService.listar();
  res.json(result);
}

export async function buscarPorId(req: Request, res: Response) {
  const result = await timesService.buscarPorId(Number(req.params.id));
  if (!result) return res.status(404).json({ message: 'Time não encontrado' });
  res.json(result);
}

export async function criar(req: Request, res: Response) {
  const result = await timesService.criar(req.body);
  res.status(201).json(result);
}

export async function atualizar(req: Request, res: Response) {
  const result = await timesService.atualizar(Number(req.params.id), req.body);
  res.json(result);
}

export async function deletar(req: Request, res: Response) {
  await timesService.deletar(Number(req.params.id));
  res.status(204).send();
}
