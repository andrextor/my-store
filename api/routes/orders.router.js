const express = require('express');
const passport = require('passport');
const OrderService = require('../services/order.services');
const validatorHandler = require('../middelwares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, resp) => {
  const orders = await service.find()
  resp.json(orders);
});


router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {

      const user = req.user;
      console.log(user);
      const order = await service.findCustomerByUser(user.sub);
      console.log(order);

      const newOrder = await service.create({ customerId: order.customerId });
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
