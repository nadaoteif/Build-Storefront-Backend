import supertest from 'supertest';
import app from '../../server';
import db from '../../database';
import { User, UsersModel } from '../../models/user.model';

const request = supertest(app);
const userModel = new UsersModel();
let token: string = '';

describe('Products API Endpoints', () => { 
    beforeAll(async () => {
      const user: User = {
        email: 'test@test.com',
        userName: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        password: 'test123'
      };
      await userModel.create(user);
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
      it('should create new product', async () => {
        const res = await request
          .post('/endpointes/products/')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'product name',
            description: 'product description',
            price: 9.99,
            category: 'Electronics.'
          });
        expect(res.status).toBe(200);
      });
  
      it('should get list of products', async () => {
        const res = await request
          .get('/endpointes/products/')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should get product info', async () => {
        const res = await request
          .get('/endpointes/products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should update product info', async () => {
        const res = await request
          .patch('/endpointes/products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: 1,
            name: 'product name',
            description: 'product description',
            price: 20,
            category: 'Electronics.'
          });
        expect(res.status).toBe(200);
      });
  
      it('should delete product', async () => {
        const res = await request
          .delete('/endpointes/products/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
      await conn.query(sql);
      conn.release();
    });

  });
  