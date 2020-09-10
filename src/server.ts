import '@config/env';
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import logger from './logger';
import routes from './routes';
import handleResponseErrors from './middlewares/handleResponseErrors';

const port = process.env.PORT || 3333;

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(routes);
app.use(handleResponseErrors);

app
  .listen(port, () => {
    logger.info(`Server started in ${port || 3333} port!`);
  })
  .on('error', e => logger.error(`Server don't started`, e));
