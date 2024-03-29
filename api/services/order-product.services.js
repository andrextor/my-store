const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderProductService {

  constructor() {
  }

  async create(data) {
    const newOrder = await models.OrderProduct.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return { orders };
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    return { order };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderProductService;
