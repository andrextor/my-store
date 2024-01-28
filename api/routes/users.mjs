import express from 'express';
import UserService from '../services/user.js';

const userRouter = express.Router();
const service = new UserService();

userRouter.get('/', async (req, resp) => {
  const products = await service.find()
  resp.json(products);
});

export default userRouter
