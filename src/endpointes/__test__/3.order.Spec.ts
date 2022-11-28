import supertest from 'supertest';
import app from '../../server';
import db from '../../database';
import { User, UsersModel } from '../../models/user.model';

const request = supertest(app);
const userModel = new UsersModel();
let token: string = '';

describe('Orders API Endpoints', () => { 
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
  
    describe('Test Authenticate method', () => { //here
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
          .post('/endpointes/orders/')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send({
            userId: 1,
            status: 'active'
          });
        expect(res.status).toBe(200);
      });
  
      it('should get list of orders', async () => {
        const res = await request
          .get('/endpointes/orders/')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should get order info', async () => {
        const res = await request
          .get('/endpointes/orders/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should get order info for current user', async () => {
        const res = await request
          .get('/endpointes/orders/users/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should update order info', async () => {
        const res = await request
          .patch('/endpointes/orders/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: 1,
            userId: 1,
            status: 'active'
          });
        expect(res.status).toBe(200);
      });
  
      it('should delete order', async () => {
        const res = await request
          .delete('/endpointes/orders/1')
          .expect('Content-type', /json/)
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
    });

    afterAll(async () => {
      const conn = await db.connect();
      const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
      await conn.query(sql);
      conn.release();
    });
  
  });
  