const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'rgidata'
})

connection.connect((err) => {
  if (err) {
    console.log('error connecting to db' + err);
  } else {
    console.log('Connected to DB!');
  }
})

let insertProduct = function(userInput, callback) {
  connection.query('INSERT INTO products(product_name) VALUE (?)', userInput, (err, results) => {
    if (err) {
      console.log('error inserting into table: products: ' + err);
    } else {
      callback(null, results);
    }
  })
}

let insertQuestion = function(userInput, callback) {
  connection.query('INSERT INTO questions(user, asked_at, question, product_id) VALUES (?, ?, ?, ?)', userInput, (err, result) => {
    if (err) {
      console.log('error inserting into table: questions:' + err);
    } else {
      callback(null, result);
    }
  })
};

let insertAnswer = function(userInput, callback) {
  connection.query('INSERT INTO answers(user_name, answer, answered_at, questions_id) VALUES (?, ?, ?, ?)', userInput, (err, data) => {
    if (err) {
      console.log('error inserting into table: answers: ' + err);
    } else {
      callback(null, data);
    }
  })
}

let getQuestions = function(input, callback) {
  connection.query('SELECT * FROM questions INNER JOIN answers ON answers.questions_id = questions.id WHERE questions.product_id = ' + input + ';', (err, results) => {
    if (err) {
      console.log('error querying db for questions and answers: ' + err);
    } else {
      callback(null, results);
    }
  })
}

module.exports = {
  insertProduct,
  insertQuestion,
  insertAnswer,
  getQuestions
}