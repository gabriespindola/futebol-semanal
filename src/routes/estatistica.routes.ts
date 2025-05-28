import { Router } from 'express';
import * as estatisticaController from '../controllers/estatistica.controller';

const router = Router();

router.get('/', (req: any, res: any) => estatisticaController.listar(req, res));
router.get('/:id', (req: any, res: any) => estatisticaController.buscarPorId(req, res));
router.post('/', (req: any, res: any) => estatisticaController.criar(req, res));
router.put('/:id', (req: any, res: any) => estatisticaController.atualizar(req, res));
router.delete('/:id', (req: any, res: any) => estatisticaController.deletar(req, res));

export default router;