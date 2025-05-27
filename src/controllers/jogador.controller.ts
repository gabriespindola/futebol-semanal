import { Request, Response } from 'express';
import * as jogadorService from '../services/jogador.service';

export async function listar(req: Request, res: Response) {
  try {
    const jogadores = await jogadorService.listar();
    res.status(200).json(jogadores);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar jogadores', erro: error });
  }
}

export async function buscarPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const jogador = await jogadorService.buscarPorId(id);
    if (!jogador) return res.status(404).json({ mensagem: 'Jogador não encontrado' });
    res.status(200).json(jogador);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar jogador pelo ID', erro: error });
  }
}

export async function criar(req: Request, res: Response) {
  try {
    const jogador = await jogadorService.criar(req.body);
    res.status(201).json(jogador);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar jogador', erro: error });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const atualizado = await jogadorService.atualizar(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Jogador não encontrado para atualizar' });
    res.status(200).json({ mensagem: 'Jogador atualizado', atualizado });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar jogador', erro: error });
  }
}

export async function deletar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const deletado = await jogadorService.deletar(id);
    if (!deletado) return res.status(404).json({ mensagem: 'Jogador não encontrado para deletar' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar jogador', erro: error });
  }
}