import { Request, Response } from 'express';
import * as partidaService from '../services/partida.service';

export async function listar(req: Request, res: Response) {
  const partidas = await partidaService.listar();
  res.json(partidas);
}

export async function buscarPorId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const partida = await partidaService.buscarPorId(id);
  if (!partida) return res.status(404).json({ mensagem: 'Partida não encontrada' });
  res.json(partida);
}

export async function criar(req: Request, res: Response) {
  const partida = await partidaService.criar(req.body);
  res.status(201).json(partida);
}

export async function atualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const atualizado = await partidaService.atualizar(id, req.body);
  res.json(atualizado);
}

export async function deletar(req: Request, res: Response) {
  const id = Number(req.params.id);
  await partidaService.deletar(id);
  res.status(204).send();
}