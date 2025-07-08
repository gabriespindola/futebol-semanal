// POST /usuarios/register
export async function register(req: Request, res: Response) {
  try {
    const { nome, email, senha, telefone } = req.body;
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        telefone,
        dataCadastro: new Date(),
        ativo: false,
      },
    });

    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      dataCadastro: usuario.dataCadastro,
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: error });
  }
}

// POST /usuarios/login
export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });
    }

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { ativo: true, ultimoLogin: new Date() },
    });

    const token = jwt.sign(
      {
        sub: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
      JWT_SECRET,
      { expiresIn: '2h', issuer: 'FutebolSemanalAPI' }
    );

    res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        dataCadastro: usuario.dataCadastro,
        ultimoLogin: usuario.ultimoLogin,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error });
  }
}
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'FULLSTACK';

// GET /usuarios
export async function listar(req: Request, res: Response) {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar usuários', erro: error });
  }
}

// GET /usuarios/:id
export async function buscarPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuário', erro: error });
  }
}

// PATCH /usuarios/:id
export async function atualizarParcial(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const data: any = {};
    const { nome, email, senha, telefone } = req.body;

    if (nome) data.nome = nome;
    if (email) data.email = email;
    if (senha) data.senha = await bcrypt.hash(senha, 10);
    if (telefone) data.telefone = telefone;

    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    await prisma.usuario.update({ where: { id }, data });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: error });
  }
}

// DELETE /usuarios/:id
export async function deletar(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    await prisma.usuario.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar usuário', erro: error });
  }
}