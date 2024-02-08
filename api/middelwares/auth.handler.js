const boom = require('@hapi/boom');
const { config } = require('../config');
const { use } = require('passport');

const checkApiKey = (req, res, next) => {

  const apikey = req.headers['api'];

  if (apikey !== config.apiKey) {
    return next(boom.unauthorized());
  }

  next();
}

const checkAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized())
  }
}

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user?.role)) {
      next();
    } else {
      next(boom.unauthorized())
    }
  }
}

const checkAdmin = () => checkRoles('admin')

module.exports = { checkApiKey, checkAdminRole, checkRoles, checkAdmin }
