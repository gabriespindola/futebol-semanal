import * as estatisticaService from '../services/estatistica.service';
import { Request, Response } from 'express';

export async function listar(req: Request, res: Response) {
  const result = await estatisticaService.listar();
  res.json(result);
}

export async function buscarPorId(req: Request, res: Response) {
  const result = await estatisticaService.buscarPorId(Number(req.params.id));
  if (!result) return res.status(404).json({ message: 'Estatística não encontrada' });
  res.json(result);
}

export async function criar(req: Request, res: Response) {
  const result = await estatisticaService.criar(req.body);
  res.status(201).json(result);
}

export async function atualizar(req: Request, res: Response) {
  const result = await estatisticaService.atualizar(Number(req.params.id), req.body);
  res.json(result);
}

export async function deletar(req: Request, res: Response) {
  await estatisticaService.deletar(Number(req.params.id));
  res.status(204).send();
}
