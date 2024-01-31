const { faker } = require('@faker-js/faker')
const { Op } = require('sequelize');
const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize');

class ProductServices {

  constructor() {
    this.products = [];

  }

  async create(data) {

    const newProduct = await models.Product.create(data, {
      include: ['category']
    });

    this.products.push(newProduct);

    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };

    const { limit, offset, price, price_min, price_max } = query;

    if (limit && offset) {
      options.limit = Number.parseInt(limit);
      options.offset = Number.parseInt(offset);
    }

    if (price) {
      options.where.price = price
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }

    console.log("options:", options)
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = this.products.find((prod) => prod.id == id)

    if (!product) {
      throw boom.notFound('Product not found');
    }

    if (product.block) {
      throw boom.conflict('Product is block');
    }

    return product
  }

  async update(id, data) {

    if (id == 'error') {
      throw boom.notFound('Product not found put');
    }

    const index = this.products.findIndex((pro) => pro.id === id);
    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...data
    };

    return this.products[index];

  }

  async delete(id) {

    const product = this.findOne(id);
    await product.destroy();
    if (id <= 1) {
      throw new Error('Product not found');
    }

    const indexProduct = this.products.findIndex((pro) => pro.id === id);
    this.products.splice(indexProduct, 1);
    return { message: 'ok' }
  }
}


module.exports = ProductServices;
