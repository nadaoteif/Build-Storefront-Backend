import db from '../../database';
import {User, UsersModel } from '../user.model';
import {Product, ProductModel } from '../product.model';
import {Order, OrderModel } from '../order.model';

const userModel = new UsersModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('Order Model', () => {
  describe('Test methods exist', () => {
    it('should have index method', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('should have show method', () => {
      expect(orderModel.show).toBeDefined();
    });

    it('should have create method', () => {
      expect(orderModel.create).toBeDefined();
    });

    it('should have update method', () => {
      expect(orderModel.update).toBeDefined();
    });

    it('should have delete method', () => {
      expect(orderModel.delete).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user: User = {
      email: 'test@test.com',
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123'
    };

    const product: Product = {
      name: 'product name',
      description: 'product description',
      price: 20,
      category: 'Electronics.'
    };

    const order: Order = {
      userId: 1,
      status: 'active'
    };

    beforeAll(async () => {
      await userModel.create(user);
      await productModel.create(product);
    });

    it('Create method should add an order', async () => {
      const createdOrder = await orderModel.create(order);
      expect(createdOrder.id).toEqual(1);
    });

    it('Index method should return a list of orders', async () => {
      const orders = await orderModel.index();
      expect(orders[0].id).toBe(1);
    });

    it('Show method should return the correct order', async () => {
      const returnedOrder = await orderModel.show(1);
      expect(returnedOrder.id).toEqual(1);
    });

    it('Update method should return an order with updated attributes', async () => {
      const returnedOrder = await orderModel.update({
        id: 1,
        userId: 1,
        status: 'completed'
      });
      expect(returnedOrder.status).toBe('completed');
    });

    it('Delete method should remove the order', async () => {
      const deletedOrder = await orderModel.delete(1);
      expect(deletedOrder.id).toBe(1);
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
      await conn.query(sql);
      conn.release();
    });
    
  });
});
