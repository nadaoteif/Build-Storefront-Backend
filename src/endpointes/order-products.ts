import { NextFunction, Request, Response, Router } from 'express';
import { OrderProductModel } from '../models/order-products.model';

const orderProductsRoutes = Router();
const orderProductModel = new OrderProductModel();

//controllers 
orderProductsRoutes.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.create(req.body);
    res.json({
      data: { ...orderProduct }
    });
  } catch (err) {
    next(err);
  }
});

orderProductsRoutes.get('/:id/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProducts = await orderProductModel.index(req.params.id as unknown as number);
    res.json({
      data: { orderProducts }
    });
  } catch (err) {
    next(err);
  }
});

orderProductsRoutes.get('/:id/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.show(req.body.orderId, req.body.productId);
    res.json({
      data: { orderProduct }
    });
  } catch (err) {
    next(err);
  }
});

orderProductsRoutes.patch('/:id/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.update(req.body);
    res.json({
      data: { orderProduct }
    });
  } catch (err) {
    next(err);
  }
});

orderProductsRoutes.delete('/:id/products/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderProduct = await orderProductModel.delete(req.body.orderId, req.body.productId);
    res.json({
      data: { orderProduct }
    });
  } catch (err) {
    next(err);
  }
});

export default orderProductsRoutes;
