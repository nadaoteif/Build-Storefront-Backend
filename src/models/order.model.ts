import db from '../database';

import {OrderProduct} from './order-products.model';

export type Order = {
  id?: number;
  status: string;
  userId: number;
  userName?: string;
  products?: OrderProduct[];
};

export class OrderModel {
  private formatOrder(order: {
    id?: number | undefined;
    status: string;
    user_id: string;
    user_name?: string;
    products: OrderProduct[];
  }): Order {
    return {
      id: order.id,
      status: order.status,
      userId: +order.user_id,
      userName: order.user_name,
      products:
        Array.isArray(order.products) && order.products.length > 0 && order.products[0]?.quantity
          ? order.products
          : []
    };
  } 

  async create(o: Order): Promise<Order> {
    try {
      const connect = await db.connect()
      const sql = 'INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *';
      const result = await connect.query(sql, [o.userId, o.status]);
      const order = result.rows[0];
      connect.release()
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id
      };
    }catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connect = await db.connect()
      const sql = "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status";
      const result = await connect.query(sql)
      connect.release()
      return result.rows.map((o) => this.formatOrder(o));
    }catch (err) {
      throw new Error(`Could not get any orders. Error: ${err}`)
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const connect = await db.connect()
      const sql = "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.user_name, o.status, o.user_id";
      const result = await connect.query(sql, [id])
      connect.release()
      return this.formatOrder(result.rows[0]);
  }catch (err) {
      throw new Error(`Could not find order with ${id}. Error: ${err}`)
  }
  }

  async update(o: Order): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *';
      const result = await connect.query(sql, [o.userId, o.status, o.id]);
      const order = result.rows[0];
      connect.release();
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id
      };
    } catch (err) {
      throw new Error(`Could not update product with ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const connect = await db.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await connect.query(sql, [id]);
      const order = result.rows[0];
      connect.release();
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id
      };
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async getOrderByUserId(userId: number): Promise<Order> {
    try {
      const sql ="SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.user_name, o.status, o.user_id";
      const connect = await db.connect();
      const result = await connect.query(sql, [userId]);
      connect.release();
      return this.formatOrder(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not find order for userId ${userId}. Error: ${err}`);
    }
  }

}
