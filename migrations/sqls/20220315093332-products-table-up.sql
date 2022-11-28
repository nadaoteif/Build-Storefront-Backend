CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(17, 2) NOT NULL, /* Limit price to 15 digits before decimal, and two after. */
  category VARCHAR(50) NOT NULL
);