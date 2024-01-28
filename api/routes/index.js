const express = require('express')
const productsRouter = require('./products.js')
const userRouter = require('./users.js')
const categoriesRouter = require('./categories.js')

const routerApi = (app) => {
  const router = express.Router();
  //V1
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
  // End Api version 1
}


module.exports = routerApi
