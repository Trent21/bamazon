DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(256) NOT NULL,
  department_name VARCHAR(256) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("converse - black", "Shoes", 40, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("converse - red", "Shoes", 40, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone 7", "Electronics", 210, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad 2 air", "Electronics", 280, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Catcher and the Rye", "Books", 12, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Atlas Shrugged", "Books", 15, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hanes Pocket-T", "Clothing", 25, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Herchel backpack - blue", "Accessories", 50, 100);