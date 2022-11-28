import { ProductModel } from '../models/product.model';

import { Router, Request, Response,NextFunction } from 'express';

const productRoutes = Router();
const productsModel = new ProductModel();

//controllers 
productRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productsModel.create(req.body);
    res.json({
      data: { ...product }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsModel.index();
    res.json({
      data: { products }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productsModel.show(req.params.id as unknown as number);
    res.json({
      data: { product }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productsModel.update(req.body);
    res.json({
      data: { product }
    });
  } catch (err) {
    next(err);
  }
});

productRoutes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productsModel.delete(req.params.id as unknown as number);
    res.json({
      data: { product }
    });
  } catch (err) {
    next(err);
  }
});

export default productRoutes;
