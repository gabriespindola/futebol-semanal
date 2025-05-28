import { Router } from 'express';
import * as jogadorController from '../controllers/jogador.controller';

const router = Router();

router.get('/', jogadorController.listar);
router.get('/:id', jogadorController.buscarPorId);
router.post('/', jogadorController.criar);
router.put('/:id', jogadorController.atualizar);
router.delete('/:id', jogadorController.deletar);

router.get('/:id/partidas', jogadorController.listarPartidasDoJogador)
router.get('/:id/estatisticas', jogadorController.listarEstatisticasDoJogador);

export default router;
