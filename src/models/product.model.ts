import db from '../database';

export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

export class ProductModel {

  private formatProduct(product: {
    id?: number | undefined;
    name: string;
    description: string;
    price: string;
    category: string;
  }): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: +product.price,
      category: product.category
    };
  }

  async create(p: Product): Promise<Product> {
    try {
      const connect = await db.connect()
      const sql = 'INSERT INTO  products (name, description, price, category) values ($1, $2, $3, $4) RETURNING *';
      const result = await connect.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category
      ]);
      connect.release()
      return this.formatProduct(result.rows[0]);
  }catch (err) {
      throw new Error(`Could not create new product ${p.name}. Error: ${err}`)
  }
  }

  async index(): Promise<Product[]> {
    try {
      const connect = await db.connect()
      const sql = 'SELECT * FROM products'
      const result = await connect.query(sql)
      connect.release()
      return result.rows.map((p) => this.formatProduct(p));
  }catch (err) {
      throw new Error(`Could not get any products. Error: ${err}`)
  }
  }

  async show(id: number): Promise<Product> {
    try {
      const connect = await db.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()
      return this.formatProduct(result.rows[0]);
  }catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
  }
  }
  
  async update(p: Product): Promise<Product> {
    try {
      const connect = await db.connect();
      const sql = 'UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *';
      const result = await connect.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category,
        p.id
      ]);
      connect.release();
      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not update product ${p.name}, Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connect = await db.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await connect.query(sql, [id]);
      connect.release();
      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
