import '@config/env';
import express, { Request, Response, NextFunction } from 'express';
import logger from '@config/logger';
import routes from './routes';

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);

app
  .listen(port, () => {
    logger.info(`Server started in ${port || 3333} port!`);
  })
  .on('error', e => logger.error(`Server don't started`, e));
