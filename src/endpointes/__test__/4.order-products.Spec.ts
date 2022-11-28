import supertest from 'supertest';
import app from '../../server';
import db from '../../database';
import {User, UsersModel } from '../../models/user.model';
import {Product, ProductModel } from '../../models/product.model';
import {Order, OrderModel } from '../../models/order.model';
import {OrderProduct, OrderProductModel } from '../../models/order-products.model';


const userModel = new UsersModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const request = supertest(app);
let token: string = '';

describe('Order Product API Endpoints', () => {
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
  
    describe('Test Authenticate method', () => {
      it('should be able to authenticate to get token', async () => {
        const res = await request
          .post('/endpointes/users/authenticate')
          .expect('Content-type', /json/)
          .send({
            userName: 'testUser',
            password: 'test123'
          });
        expect(res.status).toBe(200);
      });
    });
  
    describe('Test CRUD API methods', () => {
      it('should create new order product', async () => {
        const res = await request
          .post('/endpointes/order-products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send(orderProduct);
        expect(res.status).toBe(200);
      });
  
      it('should get list of order products', async () => {
        const res = await request
          .get('/endpointes/order-products/1/products')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should get order product info', async () => {
        const res = await request
          .get('/endpointes/order-products/1/products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should update order product info', async () => {
        const res = await request
          .get('/endpointes/order-products/1/products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: 1,
            productId: 1,
            orderId: 1,
            quantity: 2
          });  
        expect(res.status).toBe(200);
      });
  
      it('should delete order', async () => {
        const res = await request
          .delete('/endpointes/order-products/1/products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send({
            productId: 1,
            orderId: 1
          });
        expect(res.status).toBe(200);
      });
    });
    
    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
      await conn.query(sql);
      conn.release();
    });
  
  });
  