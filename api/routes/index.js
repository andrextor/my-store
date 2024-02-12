const express = require('express')
const productsRouter = require('./products.js')
const userRouter = require('./users.js')
const categoriesRouter = require('./categories.js')
const customerRoutes = require('./customers.router.js')
const orderRouter = require('./orders.router');
const orderProductRouter = require('./order-product.router.js');
const authRouter = require('./auth.router.js');
const profileRouter = require('./profile.router.js');

const routerApi = (app) => {
  const router = express.Router();
  //V1
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/orders-products', orderProductRouter);
  router.use('/customer', customerRoutes);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  // End Api version 1
}


module.exports = routerApi
