const { config } = require('./../config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'mysql',
  },
  production: {
    url: config.dbUrl,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
