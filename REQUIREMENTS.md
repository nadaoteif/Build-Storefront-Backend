# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Users

- authenticate route: ('endpointes/users/authenticate') [Post] 
- create route: ('endpointes/users/') [Post] **[token required]**
- index route: ('endpointes/users') [get] **[token required]**
- show route: ('endpointes/users/:id) [get] **[token required]**
- update route: ('endpointes/users/:id) [patch] **[token required]**
- delete route: ('endpointes/users/:id) [delete] **[token required]**


### products

- create route: ('endpointes/products/') [Post] **[token required]**
- index route: ('endpointes/products') [get]
- show route: ('endpointes/products/:id) [get]
- update route: ('endpointes/products/:id) [put] **[token required]**
- delete route: ('endpointes/products/:id) [delete] **[token required]**


### orders

- create route: ('endpointes/orders/') [Post] **[token required]**
- index route: ('endpointes/orders') [get] **[token required]**
- show route: ('endpointes/orders/:id) [get] **[token required]**
- update route: ('endpointes/orders/:id) [put] **[token required]**
- delete route: ('endpointes/orders/:id) [delete] **[token required]**

### order-products

- index route: ('endpointes/order-products/:order_id/products') [get] **[token required]**
- show route: ('endpointes/order-products/:order_id/products/:product_id) [get] **[token required]**
- update route: ('endpointes/order-products/:order_id/products/:product_id) [patch] **[token required]**
- delete route: ('endpointes/order-products/:order_id/products/:product_id) [delete] **[token required]**
## Data Types 

### User
```
type User = {
  id?: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password?: string;
}
```
### Products
```
type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
};
```
### Orders
```
type Order = {
  id?: number;
  status: string;
  userId: number;
  userName?: string;
  products?: OrderProduct[];
};
```
### Order Products
```
type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: number;
  productId: number;
  products?: Product[];
};
```
## Database Schema

### User
```
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  username VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```
## Product
```
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(17, 2) NOT NULL, /* Limit price to 15 digits before decimal, and two after. */
  category VARCHAR(50) NOT NULL
);
```
## Order
```
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id BIGINT REFERENCES users(id) NOT Null
);
```
## Order Products
```
CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) NOT NULL,
  product_id BIGINT REFERENCES products(id) NOT NULL,
  quantity INT
);
```