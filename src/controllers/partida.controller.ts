import { Request, Response } from 'express';
import * as partidaService from '../services/partida.service';

export async function listar(req: Request, res: Response) {
  try {
    const partidas = await partidaService.listar();
    res.status(200).json(partidas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar partidas', erro: error });
  }
}

export async function buscarPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const partida = await partidaService.buscarPorId(id);
    if (!partida) return res.status(404).json({ mensagem: 'Partida não encontrada' });
    res.status(200).json(partida);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar partida por ID', erro: error });
  }
}

export async function criar(req: Request, res: Response) {
  try {
    const partida = await partidaService.criar(req.body);
    res.status(201).json(partida);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar partida', erro: error });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const atualizado = await partidaService.atualizar(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Partida não encontrada para atualizar' });
    res.status(200).json({ mensagem: 'Partida atualizada', atualizado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar partida', erro: error });
  }
}

export async function deletar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deletado = await partidaService.deletar(id);
    if (!deletado) return res.status(404).json({ mensagem: 'Partida não encontrada para deletar' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar partida', erro: error });
  }
}