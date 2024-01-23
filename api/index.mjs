import express from 'express';
import chalk from 'chalk';
import routerApi from './routes/index.mjs';
import { logErrors, errorHandler, boomErrorHandler } from './middelwares/error.handler.mjs';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 3000;

const whiteList = ['www.mi-app.com']
const options = {
  origin: (origin, callback) => {
    console.log('origin: ', origin)
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('no Señorito'))
    }
  }
}

app.use(express.json());


const log = console.log;
app.get('/api', (req, resp) => {
  resp.send('Hola mi server en express');
})


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  log(`Server on port : ${chalk.white.underline.bold(port)}`);
});
