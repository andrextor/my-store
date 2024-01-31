const express = require('express');

const OrderProductService = require('../services/order-product.services');
const validatorHandler = require('../middelwares/validator.handler');
const {
  addItemSchema
} = require('../schemas/order-product.schema');

const router = express.Router();
const service = new OrderProductService();

router.get('/', async (req, resp) => {
  const orders = await service.find()
  resp.json(orders);
});


router.post(
  '/items',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.create(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
