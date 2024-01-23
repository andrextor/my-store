import express from 'express';
import chalk from 'chalk';
import routerApi from './routes/index.mjs';
import { logErrors, errorHandler, boomErrorHandler } from './middelwares/error.handler.mjs';
import { validator } from './middelwares/validator.handler.mjs';

const app = express();
const port = 3000;

app.use(express.json());


const log = console.log;
app.get('/', (req, resp) => {
  resp.send('Hola mi server en express');
})


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  const serverUrl = `http://localhost:${port}`
  log(`Server On: ${chalk.white.underline.bold(serverUrl)}`);
});
