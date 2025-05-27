import { PrismaClient } from '@prisma/client';
import * as partidaRepository from '../repository/partida.repository';
const prisma = new PrismaClient();
export function listar() {
    try {
        return partidaRepository.listar();
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao listar partida: ${error}`);
    }
}
export function buscarPorId(id) {
    try {
        return partidaRepository.buscarPorId(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao buscar partida por ID: ${error}`);
    }
}
export function criar(data) {
    try {
        return partidaRepository.criar(data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao criar partida: ${error}`);
    }
}
export function atualizar(id, data) {
    try {
        return partidaRepository.atualizar(id, data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao atualizar partida: ${error}`);
    }
}
export function deletar(id) {
    try {
        return partidaRepository.deletar(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao deletar partida: ${error}`);
    }
}
