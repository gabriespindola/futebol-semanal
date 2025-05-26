import { Request, Response } from 'express';
import * as jogadorService from '../services/jogador.service';

export async function listar(req: Request, res: Response) {
  const jogadores = await jogadorService.listar();
  res.json(jogadores);
}

export async function buscarPorId(req: Request, res: Response) {
  const id = Number(req.params.id);
  const jogador = await jogadorService.buscarPorId(id);
  if (!jogador) return res.status(404).json({ mensagem: 'Jogador não encontrado' });
  res.json(jogador);
}

export async function criar(req: Request, res: Response) {
  const jogador = await jogadorService.criar(req.body);
  res.status(201).json(jogador);
}

export async function atualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const atualizado = await jogadorService.atualizar(id, req.body);
  res.json(atualizado);
}

export async function deletar(req: Request, res: Response) {
  const id = Number(req.params.id);
  await jogadorService.deletar(id);
  res.status(204).send();
}
