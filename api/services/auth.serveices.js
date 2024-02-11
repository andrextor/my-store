const UserServices = require('../services/user.services');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const services = new UserServices();
const { config } = require('../config')
const nodemailer = require("nodemailer");

class AuthServies {

  getUser = async (email, password) => {
    try {
      const user = await services.findByEmail(email);

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
      throw error
    }
  }

  singToken = (user) => {
    const payload = { sub: user.id, role: user.role }
    const token = jwt.sign(payload, config.jwtSecret)

    return { user, token };
  }

  sendMail = async (email) => {

    try {
      const user = await services.findByEmail(email);

      console.log(user);
      if (!user) {
        throw boom.unauthorized();
      }

      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: config.emailUser,
          pass: config.emailPassword
        }
      })

      const info = await transporter.sendMail({
        from: '"Andrextor📱" <apinode@example.com>', // sender address
        to: user.email, // list of receivers
        subject: `Hello ${user.customer.name}`, // Subject line
        text: `Hello ${user.customer.name}, This is a test email`, // plain text body
        html: "<h2>Hello world?</h2> <br></br> <p>Hola, correo de prueba desde app en node js</p>", // html body
      })

      console.log("Message sent: %s", info.messageId);

      return { message: 'Email sent' }
    } catch (error) {
      throw error;
    }

  }

}

module.exports = AuthServies;
