import supertest from 'supertest';
import app from '../../server';
import db from '../../database';
import { User, UsersModel } from '../../models/user.model';

const userModel = new UsersModel();
const request = supertest(app);
let token: string = '';

describe('Test endpoints response', () => {
  it('test welcome endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Test User Routes Endpoints', () => { 
  const user: User= {
    email: 'test@test.com',
    userName: 'testUser',
    firstName: 'Test',
    lastName: 'User',
    password: 'test123'
  };

  beforeAll(async () => {
     const newUser = await userModel.create(user);
     user.id = newUser.id
  });

  afterAll(async () => {
    const conn = await db.connect();
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await conn.query(sql);
    conn.release();
  });

    describe('Test Authenticate method', () => {
      it('should be able to authenticate to get token', async () => {
        const res = await request
          .post('/endpointes/users/authenticate')
          .set('Content-type', 'application/json')
          .send({
            userName: 'testUser',
            password: 'test123'
          });
        expect(res.status).toBe(200);
      });
    });
  
    describe('Test CRUD API methods', () => {
      it('should create new user', async () => {
        const res = await request
          .post('/endpointes/users/')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            email: 'test2@test2.com',
            userName: 'testUser2',
            firstName: 'Test2',
            lastName: 'User2',
            password: 'test123'
          } as User)
        expect(res.status).toBe(200);
        const { id, email, userName, firstName, lastName } = res.body.data;
        expect(id).toBe(2);
        expect(email).toBe('test2@test2.com');
        expect(userName).toBe('testUser2');
        expect(firstName).toBe('Test2');
        expect(lastName).toBe('User2');
      });
  
      it('should delete new user', async () => {
        const res = await request
          .delete('/endpointes/users/2')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should Get All Users Route', async () => {
        const res = await request
          .get('/endpointes/users/')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toEqual(2)
      });
  
      it('should get user info', async () => {
        const res = await request
          .get('/endpointes/users/1')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
      });
  
      it('should update user info', async () => {
        const res = await request
          .patch('/endpointes/users/1')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            id: 1,
            email: 'na@oteif.com',
            userName: 'naoteif',
            firstName: 'Nada',
            lastName: 'Oteif',
            password: 'test123'
          });
        expect(res.status).toBe(200);
      });
    });
});