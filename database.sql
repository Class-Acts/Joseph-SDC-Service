

CREATE DATABASE IF NOT EXISTS rgidata;

USE rgidata;


CREATE TABLE if not exists products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(40),
  PRIMARY KEY(id)
);

CREATE TABLE if not exists questions (
  questionId int not null auto_increment,
  user VARCHAR(40),
  asked_at  DATETIME,
  question VARCHAR(300),
  product_id INT NOT NULL,
  PRIMARY KEY (questionId),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE if not exists answers (
  answerId int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(40),
  answer VARCHAR(300),
  answered_at DATETIME,
  upvotes INT DEFAULT 0,
  questions_id INT NOT NULL,
  PRIMARY KEY (answerId),
  FOREIGN KEY(questions_id) REFERENCES questions(questionId)
);