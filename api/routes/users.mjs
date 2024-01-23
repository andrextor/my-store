import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {

  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset
    })

    return;
  }

  res.send('Params not found');
})

export default userRouter
