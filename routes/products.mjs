import express from 'express';
import ProductServices from '../services/product.mjs';
import e from 'express';

const productRouter = express.Router();
const services = new ProductServices();

productRouter.get('/filters', (req, res) => {
  res.send('It`s a filter')
});

productRouter.get('/', async (req, resp) => {
  const products = await services.find()
  resp.json(products);
});

productRouter.get('/:id', async (req, res, next) => {

  try {
    const { id } = req.params
    const product = await services?.findOne(id);

    res.json(product || 'Product Not Found')
  } catch (error) {
    next(error)
  }

})

productRouter.post('/', async (req, res) => {
  const data = await services.create(req.body);

  res.json({
    message: 'Created Product',
    data: data
  })
});

productRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await services.update(id, req.body);

    res.json({
      message: 'update Product completed',
      data: data,
    })
  } catch (error) {
    next(error)
  }

});

productRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await services.update(id, req.body);
    res.json({
      message: 'update partial Product completed',
      data: data,
    })
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

productRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await services.delete(id));
});


export default productRouter;
