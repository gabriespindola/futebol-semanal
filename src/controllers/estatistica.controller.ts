import { Request, Response } from 'express';
import * as estatisticaService from '../services/estatistica.service';

export async function listar(req: Request, res: Response): Promise<void> {
  try {
    const estatisticas = await estatisticaService.listar();
    res.status(200).json(estatisticas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar estatísticas', erro: error });
  }
}

export async function buscarPorId(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const estatistica = await estatisticaService.buscarPorId(id);
    if (!estatistica) res.status(404).json({ mensagem: 'Estatística não encontrada' });
    res.status(200).json(estatistica);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar estatística por ID', erro: error });
  }
}

export async function criar(req: Request, res: Response): Promise<void> {
  try {
    const estatistica = await estatisticaService.criar(req.body);
    res.status(201).json(estatistica);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar estatística', erro: error });
  }
}

export async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const atualizado = await estatisticaService.atualizar(id, req.body);
    if (!atualizado) res.status(404).json({ mensagem: 'Estatística não encontrada para atualizar' });
    res.status(200).json({ mensagem: 'Estatística atualizada', atualizado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar estatística', erro: error });
  }
}

export async function deletar(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const deletado = await estatisticaService.deletar(id);
    if (!deletado) res.status(404).json({ mensagem: 'Estatística não encontrada para deletar' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar estatística', erro: error });
  }
}