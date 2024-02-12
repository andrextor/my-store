const UserServices = require('../services/user.services');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { config } = require('../config')
const nodemailer = require("nodemailer");

const service = new UserServices();

class AuthServies {

  getUser = async (email, password) => {
    try {
      const user = await service.findByEmail(email);

      if (!user) {
        throw boom.unauthorized();
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw boom.unauthorized();
      }

      delete user.dataValues.password;

      return user;

    } catch (error) {
      throw error;
    }
  }

  singToken = (user) => {
    const payload = { sub: user.id, role: user.role }
    const token = jwt.sign(payload, config.jwtSecret)

    return { user, token };
  }

  sendMail = async (infoMail) => {
    try {
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: config.emailUser,
          pass: config.emailPassword
        }
      })

      const info = await transporter.sendMail(infoMail)

      console.log("Message sent: %s", info.messageId);

      return { message: 'Email sent' }
    } catch (error) {
      throw error;
    }

  }

  recoveryPassword = async (email) => {
    try {
      const user = await service.findByEmail(email);
      console.log('MI USER:;', user.id);
      if (!user) {
        throw boom.unauthorized();
      }

      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: '15min'
      });

      const link = `http://myfrontend.com/recovery?token=${token}`;

      await service.update(user.id, { recoveryToken: token });

      const infoEmail = {
        from: `Andrextor📱 ${config.emailStm}`, // sender address
        to: user.email, // list of receivers
        subject: `Recovery password, ${user.customer.name}`, // Subject line
        text: `Hello ${user.customer.name}, This is a test email`, // plain text body
        html: `<h2>Recovery Password?</h2> <br></br> <p>Click on this link, to recover your password</p> <br></br> <a href=${link} target=_blank>Link Recovery 2 </a>`, // html body
      }

      const response = await this.sendMail(infoEmail)


      return response;

    } catch (error) {
      throw error;
    }
  }

  resetPassword = async (token, newPassword) => {
    try {
      const payload = jwt.verify(token, config.jwtSecret);

      const user = await service.findOne(payload.sub)


      if (user.recoveryToken !== token) {
        console.log('ENTREA');
        throw boom.unauthorized()
      }

      const hash = await bcrypt.hash(newPassword, 2);
      console.log('HASH:', hash);
      await service.update(payload.sub, { password: hash, recoveryToken: null });

      return { message: 'Password Update' }

    } catch (error) {
      throw error
    }
  }

}

module.exports = AuthServies;
