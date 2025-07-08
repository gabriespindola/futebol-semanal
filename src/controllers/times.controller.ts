import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// Para upload local, use Multer. Para Azure Blob, use @azure/storage-blob.

const prisma = new PrismaClient();

// GET /times
export async function listar(req: Request, res: Response) {
  try {
    const times = await prisma.time.findMany();
    res.json(times);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar times', erro: error });
  }
}

// GET /times/:id
export async function buscarPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const time = await prisma.time.findUnique({ where: { id } });
    if (!time) return res.status(404).json({ mensagem: 'Time não encontrado' });
    res.json(time);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar time', erro: error });
  }
}

// PATCH /times/:id
export async function atualizarParcial(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const time = await prisma.time.findUnique({ where: { id } });
    if (!time) return res.status(404).json({ mensagem: 'Time não encontrado' });

    const atualizado = await prisma.time.update({
      where: { id },
      data,
    });
    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar time', erro: error });
  }
}

// POST /times
export async function criar(req: Request, res: Response) {
  try {
    const { nome, estado, fundacao, usuarioId } = req.body;
    const time = await prisma.time.create({
      data: {
        nome,
        usuarioId,
        fotoUrl: null,
      },
    });
    res.status(201).json(time);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar time', erro: error });
  }
}

// DELETE /times/:id
export async function deletar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const time = await prisma.time.findUnique({ where: { id } });
    if (!time) return res.status(404).json({ mensagem: 'Time não encontrado' });

    await prisma.time.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar time', erro: error });
  }
}

// POST /times/:id/upload-foto
export async function uploadFoto(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const time = await prisma.time.findUnique({ where: { id } });
    if (!time) return res.status(404).json({ mensagem: 'Time não encontrado' });
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ mensagem: 'Arquivo inválido.' });
    }

    // Upload local:
    const fotoUrl = `/uploads/${req.file.filename}`;
    await prisma.time.update({
      where: { id },
      data: { fotoUrl },
    });

    return res.json({ url: fotoUrl });
    // e salve a URL retornada no campo fotoUrl.
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer upload da foto', erro: error });
  }
}