const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const UserServices = require('../../../services/user.services');
const bcrypt = require('bcrypt');
const services = new UserServices();


const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const user = await services.findByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false)
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        done(boom.unauthorized(), false)
      }

      delete user.dataValues.password;

      done(null, user)

    } catch (error) {
      done(error, false)
    }
  }
);

module.exports = localStrategy;



