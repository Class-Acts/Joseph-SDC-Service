CREATE DATABASE IF NOT EXISTS rgidata;

USE rgidata;


CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40),
  PRIMARY KEY(id)
);

CREATE TABLE questions (
  id int not null auto_increment,
  user VARCHAR(40),
  createdAt  DATE,
  question VARCHAR(300),
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE answers (
  id int NOT NULL AUTO_INCREMENT,
  user VARCHAR(40),
  answer VARCHAR(300),
  created_at DATE,
  upvotes INT DEFAULT 0,
  questions_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(questions_id) REFERENCES questions(id)
);