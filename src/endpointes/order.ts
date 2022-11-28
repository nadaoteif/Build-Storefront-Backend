import { OrderModel } from '../models/order.model';
import { Router, Request, Response, NextFunction } from 'express';

const orderRoutes = Router();
const ordersModel = new OrderModel();

//controllers
orderRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersModel.create(req.body);
    res.json({
      data: { ...order }
    });
  } catch (err) {
    next(err);
  }
});

orderRoutes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await ordersModel.index();
    res.json({
      data: { orders }
    });
  } catch (err) {
    next(err);
  }
});

orderRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersModel.show(req.params.id as unknown as number);
    res.json({
      data: { order }
    });
  } catch (err) {
    next(err);
  }
});

orderRoutes.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersModel.getOrderByUserId(req.params.id as unknown as number);
    res.json({
      data: { order }
    });
  } catch (err) {
    next(err);
  }
});

orderRoutes.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersModel.update(req.body);
    res.json({
      data: { order }
    });
  } catch (err) {
    next(err);
  }
});

orderRoutes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await ordersModel.delete(req.params.id as unknown as number);
    res.json({
      data: { order }
    });
  } catch (err) {
    next(err);
  }
});

export default orderRoutes;


