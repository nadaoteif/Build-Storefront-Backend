import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config';
import hash from '../hashedpassword';


export type User = {
  id?: number | undefined;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password?: string | undefined;
};

export class UsersModel {
  private formatUser(user: {
    id?: number | undefined;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
  }): User {
    return {
      id: user.id,
      email: user.email,
      userName: user.user_name,
      firstName: user.first_name,
      lastName: user.last_name
    };
  }
  async create(u: User): Promise<User> {
    try {
      const connect = await db.connect()
      const sql = 'INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name';
      const result = await connect.query(sql, [
        u.email,
        u.userName,
        u.firstName,
        u.lastName,
        hash(u.password as string)
      ])
      connect.release()
      return this.formatUser(result.rows[0]);
    }catch (err) {
      throw new Error(`Could create ${u.userName}. Error: ${err}`)
  }
  }

  async index(): Promise<User[]> {
    try {
      const connect = await db.connect()
      const sql = 'SELECT * FROM users'
      const result = await connect.query(sql)
      connect.release()
      return result.rows.map((u) => this.formatUser(u));
    }catch (err) {
      throw new Error(`Could not retrieving users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connect = await db.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const result = await connect.query(sql, [id])
      connect.release()
      return this.formatUser(result.rows[0]);
  }catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
  }
  }

  async update(u: User): Promise<User> {
    try {
      const connect = await db.connect();
      const sql = 'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *';
      const result = await connect.query(sql, [
        u.email,
        u.userName,
        u.firstName,
        u.lastName,
        hash(u.password as string),
        u.id
      ]);
      connect.release();
      return this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not update user ${u.userName}. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const connect = await db.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await connect.query(sql, [id]);
      connect.release();
      return this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not delete user ${id}, Error: ${err}`);
    }
  }

  async authenticate(userName: string, password: string): Promise<User | null> {
    try {
      const connect = await db.connect();
      const sql = 'SELECT password FROM users WHERE user_name=$1';
      const result = await connect.query(sql, [userName]);
      if (result.rows.length) {
        const { password: hashedPass } = result.rows[0];
        const isValid = bcrypt.compareSync(`${password}${config.pepper}`, hashedPass);
        if (isValid) {
          const userInfo = await connect.query('SELECT * FROM users WHERE user_name=($1)', [
            userName
          ]);
          return this.formatUser(userInfo.rows[0]);
        }
      }
      connect.release();
      return null;
    } catch (err) {
      throw new Error(`Unable to login, Error: ${err}`);
    }
  }
}
