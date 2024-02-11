const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const authService = require('../../../services/auth.serveices');

const services = new authService();


const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const user = await services.getUser(email, password);

      done(null, user)

    } catch (error) {
      done(error, false)
    }
  }
);

module.exports = localStrategy;



