import { Router } from 'express';
import SessionController from '@controllers/Session/SessionController';

const router = Router();

router.post('/', SessionController.store);

export default router;
