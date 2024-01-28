const express = require('express');
const UserService = require('../services/user.js');

const userRouter = express.Router();
const service = new UserService();

userRouter.get('/', async (req, resp) => {
  const products = await service.find()
  resp.json(products);
});

module.exports = userRouter
