const { ValidationError } = require('sequelize');

const logErrors = (err, req, res, next) => {
  console.log('logErrors');
  //console.error(err)
  next(err);
}

const errorHandler = (err, req, res, next) => {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

const boomErrorHandler = (err, req, res, next) => {

  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
    return;
  }
  next(err)
}

const ormErrorHandler = (err, req, res, next) => {

  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      erros: err.errors
    });
    return;
  }
  next(err)
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
