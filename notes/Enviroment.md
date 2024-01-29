#Variables de entorno

### agregar archivo .env o copiar .env.example

`cp .env.example .env`

```

PORT = 3000
NODE_ENV='development'
DB_NAME=my_store
DB_USER=admin
DB_PASSWORD=admin
DB_PORT=33060
DB_HOST=localhost

```

### Crear archivo manejo de variables de entorno config.js

instalción paquete dotenv

`npm install dotenv --save`

configuraciones archivo

```js
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.DB_PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME
}

module.exports = { config };
```
