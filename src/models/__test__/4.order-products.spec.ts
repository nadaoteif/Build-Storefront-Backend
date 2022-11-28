import db from '../../database';
import {User, UsersModel } from '../user.model';
import {Product, ProductModel } from '../product.model';
import {Order, OrderModel } from '../order.model';
import {OrderProduct, OrderProductModel } from '../order-products.model';

const userModel = new UsersModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();

describe('Order Product Model', () => {
  describe('Test methods exist', () => {
    it('should have index method', () => {
      expect(orderProductModel.index).toBeDefined();
    });

    it('should have show method', () => {
      expect(orderProductModel.show).toBeDefined();
    });

    it('should have create method', () => {
      expect(orderProductModel.create).toBeDefined();
    });

    it('should have update method', () => {
      expect(orderProductModel.update).toBeDefined();
    });

    it('should have delete method', () => {
      expect(orderProductModel.delete).toBeDefined();
    });
  });

  describe('Test Order Products Model logic', () => {
    const user: User = {
      email: 'test@test.com',
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123'
    };

    const product: Product= {
      name: 'product name',
      description: 'product description',
      price: 9.99,
      category: 'Electronics.'
    };

    const order: Order = {
      userId: 1,
      status: 'active'
    };

    const orderProduct: OrderProduct = {
      quantity: 1,
      orderId: 1,
      productId: 1
    };

    beforeAll(async () => {
      await userModel.create(user);
      await productModel.create(product);
      await orderModel.create(order);
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
      await conn.query(sql);
      conn.release();
    });

    it('Create method should return an order product', async () => {
      const createdOrderProduct = await orderProductModel.create(orderProduct);
      expect(createdOrderProduct.quantity).toBe(1);
    });

    it('Index method should return a list of products in a specific order', async () => {
      const orderProducts = await orderProductModel.index(1);
      expect(orderProducts[0].id).toBe(1);
    });

    it('Show method should return the correct product in a specific order', async () => {
      const targetOrderProduct = await orderProductModel.show(1, 1);
      expect(targetOrderProduct.quantity).toBe(1);
    });

    it('Update method should return a order with updated properties', async () => {
      const editOrderProduct = await orderProductModel.update({
        id: 1,
        quantity: 10,
        orderId: 1,
        productId: 1
      });
      expect(editOrderProduct.quantity).toEqual(10);
    });

    it('Delete method should remove products from list of product in order', async () => {
      const deletedOrderProduct = await orderProductModel.delete(1, 1);
      expect(deletedOrderProduct.id).toBe(1);
    });
  });
});
