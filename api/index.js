const express = require('express');
const routerApi = require('./routes/index.js');
const { ormErrorHandler, logErrors, errorHandler, boomErrorHandler } = require('./middelwares/error.handler.js');
const checkApiKey = require('./middelwares/auth.handler.js');


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

app.get('/nueva-ruta',
  checkApiKey,
  (req, resp) => {
    resp.send('Hola soy una ruta autorizada');
  })


routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  log(`Server on port : http://localhost:${port}`);
});
