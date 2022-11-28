import { Router } from 'express';
import auth_Middleware from './middlewares/auth'
import userRoutes from './endpointes/users';
import productRoutes from './endpointes/products';
import orderRoutes from './endpointes/order';
import orderProductsRoutes from './endpointes/order-products';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', auth_Middleware, productRoutes);
routes.use('/orders', auth_Middleware, orderRoutes);
routes.use('/order-products', auth_Middleware, orderProductsRoutes);

export default routes;