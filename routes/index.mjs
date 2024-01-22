import express from 'express';
import productsRouter from './products.mjs'
import userRouter from './users.mjs'
import categoriesRouter from './categories.mjs'

const routerApi = (app) => {
  const router = express.Router();
  //V1
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoriesRouter);
  // End Api version 1
}


export default routerApi
