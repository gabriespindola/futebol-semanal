import { Router } from 'express';
import * as partidaController from '../controllers/partida.controller';
const router = Router();
router.get('/', partidaController.listar);
router.get('/:id', partidaController.buscarPorId);
router.post('/', partidaController.criar);
router.put('/:id', partidaController.atualizar);
router.delete('/:id', partidaController.deletar);
export default router;
