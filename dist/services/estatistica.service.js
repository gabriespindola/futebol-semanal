import { PrismaClient } from '@prisma/client';
import * as estatisticaRepository from '../repository/estatistica.repository';
const prisma = new PrismaClient();
export function listar() {
    try {
        return estatisticaRepository.listar();
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao listar estatísticas: ${error}`);
    }
}
export function buscarPorId(id) {
    try {
        return estatisticaRepository.buscarPorId(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao obter estatística por ID: ${error}`);
    }
}
export function criar(data) {
    try {
        return estatisticaRepository.criar(data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao criar estatísticas: ${error}`);
    }
}
export function atualizar(id, data) {
    try {
        return estatisticaRepository.atualizar(id, data);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao atualizar estatísticas: ${error}`);
    }
}
export function deletar(id) {
    try {
        return estatisticaRepository.deletar(id);
    }
    catch (error) {
        throw new Error(`Service Error: Erro ao deletar estatísticas: ${error}`);
    }
}
