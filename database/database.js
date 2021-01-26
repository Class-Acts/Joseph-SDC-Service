const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'rgidata'
})

connection.connect((err) => {
  if (err) {
    console.log('error connecting to db' + err);
  } else {
    console.log('Connected to DB!');
  }
})

let createSchema = function() {
  connection.query('CREATE DATABASE IF NOT EXISTS rgidata;');
  connection.query('USE rgidata;');
  connection.query('CREATE TABLE IF NOT EXISTS products( id INT NOT NULL AUTO_INCREMENT, product_name VARCHAR(40), PRIMARY KEY(id));');
  connection.query('CREATE TABLE IF NOT EXISTS questions (questionId int not null auto_increment, user VARCHAR(40),asked_at  DATETIME, question VARCHAR(300), product_id INT NOT NULL, PRIMARY KEY(questionId), FOREIGN KEY (product_id) REFERENCES products(id));');
  connection.query('CREATE TABLE IF NOT EXISTS ANSWERS( answerId int NOT NULL AUTO_INCREMENT, user_name VARCHAR(40), answer VARCHAR(300), answered_at DATETIME, upvotes INT DEFAULT 0,questions_id INT NOT NULL, PRIMARY KEY (answerId), FOREIGN KEY(questions_id) REFERENCES questions(questionId));');
}

createSchema();


let insertProduct = function (userInput, callback) {
  connection.query('INSERT INTO products(product_name) VALUE (?)', userInput, (err, results) => {
    if (err) {
      console.log('error inserting into table: products: ' + err);
    } else {
      callback(null, results);
    }
  })
}

let insertQuestion = function (userInput, callback) {
  connection.query('INSERT INTO questions(user, asked_at, question, product_id) VALUES (?, ?, ?, ?)', userInput, (err, result) => {
    if (err) {
      console.log('error inserting into table: questions:' + err);
    } else {
      callback(null, result);
    }
  })
};

let insertAnswer = function (userInput, callback) {
  connection.query('INSERT INTO answers(user_name, answer, answered_at, questions_id) VALUES (?, ?, ?, ?)', userInput, (err, data) => {
    if (err) {
      console.log('error inserting into table: answers: ' + err);
    } else {
      callback(null, data);
    }
  })
}

let getQuestions = function (input, callback) {
  connection.query('SELECT * FROM questions LEFT JOIN answers ON answers.questions_id = questions.questionId WHERE questions.product_id = ' + input, (err, results) => {
    if (err) {
      console.log('error querying db for questions and answers: ' + err);
    } else {
      callback(null, results);
    }
  })
}

let updateVotes = function (input, callback) {
  connection.query('UPDATE answers set upvotes = upvotes + 1 where answerId = ' + input, (err, data) => {
    if (err) {
      console.log('error updating votes' + err);
    } else {
      callback(null, data);
    }
  })
}

module.exports = {
  insertProduct,
  insertQuestion,
  insertAnswer,
  getQuestions,
  updateVotes
}