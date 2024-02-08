const passport = require('passport');

const localStrategy = require('./strategies/local.strategies');

passport.use(localStrategy);
