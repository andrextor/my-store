const express = require('express');

const CustomerService = require('../services/customer.services');
const validationHandler = require('../middelwares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
  createCustomerWithUserIdSchema
} = require('../schemas/customer.schema');

const customerRoutes = express.Router();
const service = new CustomerService();

customerRoutes.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

customerRoutes.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

customerRoutes.post('/user',
  validationHandler(createCustomerWithUserIdSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body);
      res.status(201).json(await service.createWithUser(body));
    } catch (error) {
      next(error);
    }
  }
);

customerRoutes.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

customerRoutes.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = customerRoutes;
