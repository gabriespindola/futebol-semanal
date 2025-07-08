import { Router } from 'express';
import * as homeController from '../controllers/home.controller';

const router = Router();

router.get('/', homeController.index);
router.get('/privacy', homeController.privacy);
router.get('/error', homeController.error);

export default router;
