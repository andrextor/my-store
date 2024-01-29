agregar variable de entorno: 
NODE_ENV='development'

#migraciones Sequelize

### instalar cli

```bash
npm i sequelize-cli --save-dev
```

### Agregar archivo configuración base de datos: './api/db/config.js'

```js
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql'
  },
  producion: {
    url: URI,
    dialect: 'mysql'
  }
};
```


### Agregar archivo de configuración:

.sequelizerc
```js
  module.exports = {
    'config' : './api/db/config.js',
    'models-paht': './api/db/models/',
    'migrations-paht' : './api/db/migrations',
    'seed-path' : './api/db/seeders'
  }
```

### Agregar en los scripts de package.json

comando que ayuda a crear migraciones 
ejemplo: `pnpm make:migration create-user`

```
  "scripts": {
    ...
    "make:migration" : "sequelize-cli migration:generate --name"
  },
```

### Agregar en los scripts de package.json

comando para correr migraciones
ejemplo: `pnpm migrate`

```
  "scripts": {
    ...
     "migrate" : "sequelize-cli db:migrate"
  },
```

### Agregar en los scripts de package.json

comando para hacer rollback de migraciones
ejemplo: `pnpm migrate:rollback`

```
  "scripts": {
    ...
     "migrate" : "sequelize-cli db:migrate:undo"
  },
```

> **Note:** important.
>
> Las migraciones debe separarse por guíon medio "-" ejemplo
> `20240129033224-add-column-role-in-table-user`
> esto para la hora de un rollback, se ejecuta correctamente
