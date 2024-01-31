const { config } = require('../config');

let URL = '';

if (config.isProd) {
  URL = config.dbUrl;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URL = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

module.exports = {
  development: {
    url: URL,
    dialect: 'mysql'
  },
  producion: {
    url: URL,
    dialect: 'mysql'
  }
};
