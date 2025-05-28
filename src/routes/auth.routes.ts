import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', (req: any, res: any) => authController.login(req, res));
router.post('/register', (req: any, res: any) => authController.register(req, res));

export default router;