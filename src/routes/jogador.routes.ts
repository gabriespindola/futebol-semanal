import { Router } from 'express';
import * as jogadorController from '../controllers/jogador.controller';
import upload from '../middlewares/upload.middleware';

const router = Router();

router.get('/', (req: any, res: any) => jogadorController.listar(req, res));
router.get('/:id', (req: any, res: any) => jogadorController.buscarPorId(req, res));
router.post('/', upload.single('imagem'), (req: any, res: any) => jogadorController.criar(req, res));
router.put('/:id', (req: any, res: any) => jogadorController.atualizar(req, res));
router.delete('/:id', (req: any, res: any) => jogadorController.deletar(req, res));

router.get('/:id/partidas', (req: any, res: any) => jogadorController.listarPartidasDoJogador(req, res));
router.get('/:id/estatisticas', (req: any, res: any) => jogadorController.listarEstatisticasDoJogador(req, res));

export default router;