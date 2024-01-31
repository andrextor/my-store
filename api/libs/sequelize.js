const { Sequelize } = require('sequelize');
const { config } = require('../config');
const setupModels = require('../db/models');

let URL = '';
if (config.isProd) {
  URL = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URL = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequelize = new Sequelize(URL, {
  dialect: 'mysql',
  ssl: {
    rejectUnaunthorized: false
  }
});

setupModels(sequelize);

module.exports = sequelize;
