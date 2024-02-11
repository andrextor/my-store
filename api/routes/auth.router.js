const express = require('express');
const passport = require('passport')
const router = express.Router();
const authService = require('../services/auth.serveices');
const authServices = new authService();
const { recoveryEmail } = require('../schemas/user.schema');
const validatorHandler = require('../middelwares/validator.handler')

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {

    try {
      res.json(authServices.singToken(req.user));

    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  validatorHandler(recoveryEmail, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const message = await authServices.sendMail(email)

      res.status(200).json(message);

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
