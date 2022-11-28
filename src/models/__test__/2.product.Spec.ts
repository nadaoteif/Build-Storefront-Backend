import {Product, ProductModel } from '../product.model';
import db from '../../database';

const productsModel = new ProductModel();

describe('Product Model', () => {
    describe('Test methods exist', () => {
      it('should have index method', () => {
        expect(productsModel.index).toBeDefined();
      });
  
      it('should have show method', () => {
        expect(productsModel.show).toBeDefined();
      });
  
      it('should have create method', () => {
        expect(productsModel.create).toBeDefined();
      });

      it('should have update method', () => {
        expect(productsModel.update).toBeDefined();
      });
  
      it('should have delete method', () => {
        expect(productsModel.delete).toBeDefined();
      });
    });
  
    describe('Test Model logic', () => {
      const product: Product = {
        name: 'product name',
        description: 'product description',
        price: 9.99,
        category: 'Electronics.'
      };
  
      it('Create method should add a product', async () => {
        const createdProduct = await productsModel.create(product);
        expect(createdProduct).toEqual({
          ...product,
          id: createdProduct.id,
          price: createdProduct.price
        });
      });
  
      it('Index method should return a list of products', async () => {
        const products = await productsModel.index();
        expect(products.length).toBe(1);
      });
  
      it('Show method should return the correct product', async () => {
        const returnedProduct = await productsModel.show(1);
        expect(returnedProduct).toEqual({
          ...product,
          id: 1,
          price: returnedProduct.price
        });
      });
  
      it('Update method should return a product with updated attributes', async () => {
        const returnedProduct = await productsModel.update({
          id: 1,
          name: 'product name edited',
          description: 'product description edited',
          price: 10,
          category: 'Electronics.'
        });
        expect(returnedProduct.name).toBe('product name edited');
      });
  
      it('Delete method should remove the product', async () => {
        const deletedProduct = await productsModel.delete(1);
        expect(deletedProduct.id).toBe(1);
      });

      afterAll(async () => {
        const conn = await db.connect();
        const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
        await conn.query(sql);
        conn.release();
      });
      
    });
  });
  