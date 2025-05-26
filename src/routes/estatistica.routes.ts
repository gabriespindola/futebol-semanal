import { Router } from 'express';
import * as estatisticaController from '../controllers/estatistica.controller';

const router = Router();

router.get('/', estatisticaController.listar);
router.get('/:id', estatisticaController.buscarPorId);
router.post('/', estatisticaController.criar);
router.put('/:id', estatisticaController.atualizar);
router.delete('/:id', estatisticaController.deletar);

export default router;