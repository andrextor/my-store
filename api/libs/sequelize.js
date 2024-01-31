const { Sequelize } = require('sequelize');

const { config } = require('./../config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'mysql',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}


if (config.isProd) {
  URL = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URL = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequelize = new Sequelize(URL, options);

setupModels(sequelize);

module.exports = sequelize;
