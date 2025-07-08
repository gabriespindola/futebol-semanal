import { Router } from 'express';
import * as usuariosController from '../controllers/usuarios.controller';

const router = Router();

// Usuários
router.get('/', usuariosController.listar);
router.get('/:id', usuariosController.buscarPorId);
router.patch('/:id', usuariosController.atualizarParcial);
router.delete('/:id', usuariosController.deletar);

// Autenticação de usuário
router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);

export default router;
