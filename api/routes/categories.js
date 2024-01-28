const express = require('express');

const categoriesRouter = express.Router();

categoriesRouter.get('/', (req, resp) => {
  resp.send('Hola carola soy categories')
});


categoriesRouter.get('/:category_id/products/:product_id', (req, resp) => {
  const { category_id, product_id } = req.params
  resp.json({
    category_id,
    product_id
  });
});

module.exports = categoriesRouter
