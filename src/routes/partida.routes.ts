import { Router } from 'express';
import * as partidaController from '../controllers/partida.controller';

const router = Router();

router.get('/', (req: any, res: any) => partidaController.listar(req, res));
router.get('/:id', (req: any, res: any) => partidaController.buscarPorId(req, res));
router.post('/', (req: any, res: any) => partidaController.criar(req, res));
router.put('/:id', (req: any, res: any) => partidaController.atualizar(req, res));
router.delete('/:id', (req: any, res: any) => partidaController.deletar(req, res));

router.get('/:id/jogadores', (req: any, res: any) => partidaController.listarJogadoresDaPartida(req, res));

export default router;