import { Router } from 'express';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', verifyAuthentication, usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
