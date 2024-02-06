const boom = require('@hapi/boom');
const { config } = require('../config')

const checkApiKey = (req, res, next) => {

  const apikey = req.headers['api'];

  if (apikey !==  config.apiKey) {
    return next(boom.unauthorized());
  }

  next();
}

module.exports = checkApiKey
