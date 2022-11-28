import {User, UsersModel } from '../user.model';
import db from '../../database';

const usersModel = new UsersModel();

describe('Test User Model', () => {
    describe('Test methods exist', () => {
      it('should have index method', () => {
        expect(usersModel.index).toBeDefined();
      });
  
      it('should have show method', () => {
        expect(usersModel.show).toBeDefined();
      });
  
      it('should have create method', () => {
        expect(usersModel.create).toBeDefined();
      });

      it('should have update method', () => {
        expect(usersModel.update).toBeDefined();
      });
  
      it('should have delete method', () => {
        expect(usersModel.delete).toBeDefined();
      });
  
      it('should have Authenticate method', () => {
        expect(usersModel.authenticate).toBeDefined();
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
  
      it('Create method should return a User', async () => {
        const createdUser = await usersModel.create(user);
        expect(createdUser).toEqual({
          id: createdUser.id,
          email: 'test@test.com',
          userName: 'testUser',
          firstName: 'Test',
          lastName: 'User'
        } as User);
      });
  
      it('Index method should return All available users in DB', async () => {
        const users = await usersModel.index();
        expect(users.length).toBe(1);
      });
  
      it('Show method should return testUser when called with ID (1)', async () => {
        const returnedUser = await usersModel.show(1);
        expect(returnedUser.id).toBe(1);
      });
  
      it('Update method should return a user with updated attributes', async () => {
        const updatedUser = await usersModel.update({
          id: 1,
          email: 'nada@nada.com',
          userName: 'nadaoteif',
          firstName: 'Nada',
          lastName: 'Oteif',
          password: 'test123'
        });
        expect(updatedUser.email).toBe('nada@nada.com');
        expect(updatedUser.userName).toBe('nadaoteif');
        expect(updatedUser.firstName).toBe('Nada');
        expect(updatedUser.lastName).toBe('Oteif');
      });
  
      it('Authenticate method should return the authenticated user', async () => {
        const authenticatedUser = await usersModel.authenticate('nadaoteif', 'test123');
        if (authenticatedUser) {
          expect(authenticatedUser.email).toBe('nada@nada.com');
          expect(authenticatedUser.userName).toBe('nadaoteif');
        }
      });
  
      it('Authenticate method should return null for wrong credentials', async () => {
        const authenticatedUser = await usersModel.authenticate('nadaoteif', 'fakeuser');
        expect(authenticatedUser).toBe(null);
      });
  
      it('Delete method should delete user from DB', async () => {
        const deletedUser = await usersModel.delete(1);
        expect(deletedUser.id).toBe(1);
      });
        
      afterAll(async () => {
        const conn = await db.connect();
        const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
      });

    });
  });
  