const boom = require('@hapi/boom');

const validator = (schema, property) => {
  return (req, res, next) => {

    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
      return;
    }

    next();
  }
}

module.exports = validator
