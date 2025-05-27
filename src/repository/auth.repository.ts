import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function encontrarPorEmail(email: string) {
  try {
    return await prisma.usuario.findUnique({ where: { email } });
  } catch (error) {
    throw new Error('Erro ao buscar usuário por e-mail');
  }
}

export async function criarUsuario(data: { email: string; senha: string; nome: string }) {
  try {
    return await prisma.usuario.create({ data });
  } catch (error) {
    throw new Error('Erro ao criar usuário');
  }
}