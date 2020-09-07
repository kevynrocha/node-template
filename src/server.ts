import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app
  .listen(3333, () => {
    console.log('Back-end started in 3333 port!');
  })
  .on('error', e => console.log(`Back-end don't started`, e));
