
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as authRepository from '../repository/auth.repository';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'FULLSTACK';

export async function register(data: { email: string; senha: string; nome: string }) {
    try {
        const usuarioExistente = await authRepository.encontrarPorEmail(data.email);

        if (usuarioExistente) {
            throw new Error('E-mail já cadastrado');
        }

        const senhaHash = await bcrypt.hash(data.senha, 10);
        const usuario = await authRepository.criarUsuario({
            email: data.email,
            senha: senhaHash,
            nome: data.nome,
        });

        return { id: usuario.id, email: usuario.email, nome: usuario.nome };

    } catch (error) {
        throw error;
    }
}

export async function login(data: { email: string; senha: string }) {
    try {
        const usuario = await authRepository.encontrarPorEmail(data.email);

        if (!usuario) {
            throw new Error('Usuário ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(data.senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha inválidos');
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, nome: usuario.nome },
            SECRET,
            { expiresIn: '1h' }
        );

        return { token };
        
    } catch (error) {
        throw error;
    }
}