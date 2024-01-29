const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class ProductServices {

  constructor() {
    this.products = [];
    this.getProducts();
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }

    this.products.push(newProduct);

    return newProduct;

  }

  async find() {
    return new Promise((res, rej) => {
      res(this.products)
    })
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
    if (id <= 1) {
      throw new Error('Product not found');
    }

    const indexProduct = this.products.findIndex((pro) => pro.id === id);
    this.products.splice(indexProduct, 1);
    return { message: 'ok' }
  }

  getProducts = (limit = 10) => {
    const data = [];

    for (let i = 1; i <= 100; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        block: faker.datatype.boolean()
      });

    }
    return data;
  }
}


module.exports = ProductServices;