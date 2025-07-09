import { Router } from 'express';
import * as timesController from '../controllers/times.controller';

const router = Router();

router.get('/', timesController.listar);
router.get('/:id', timesController.buscarPorId);
router.post('/', timesController.criar);
router.put('/:id', timesController.atualizar);
router.delete('/:id', timesController.deletar);

export default router;
