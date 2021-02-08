const sql = require('mssql');
const dbOptions = {
  path: './data/'
};

const config = {
  user: 'student',
  password: 'Qandapass1234',
  server: 'localhost',
  database: 'qanda',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  stream: true
};

//Enables error handler on connections.
sql.on('error', err => {
  console.log(err);
})

let makeQuery = (queryTemplate, input, pattern) => {
  return (input, callback) => {
    sql.connect(config)
      .then(pool => {
        return pool.request()
          .query(queryTemplate(input));
      })
      .then(result => {
        if (pattern) {
          callback(null, pattern(result));
        }
      })
      .catch(err => {
        callback(err);
      });
  };
};

let makeInsert = (tableName) => {
  return makeQuery((input) => `BULK INSERT ${tableName} FROM '${dbOptions.path + tableName}.tbl' WITH  (FIELDTERMINATOR =' |' , ROWTERMINATOR =' |\n')`, input);
};

let getQuestions = makeQuery((input) => `SELECT * FROM questions LEFT OUTER JOIN answers ON answers.questions_id = questions.questionId WHERE questions.product_id = ${input}`, input, (result) => ({
  answer: result.answer,
  answerId: result.answerId,
  asked_at: result.asked_at,
  product_id: result.product_id,
  question: result.question,
  questionId: result.questionId,
  questions_id: result.questions_id,
  upvotes: result.upvotes,
  user: result.user,
  user_name: result.user_name
}));

module.exports = {
  sql: sql,
  makeQuery: makeQuery,
  insertProduct: makeInsert('Product'),
  insertQuestion: makeInsert('Question'),
  insertAnswer: makeInsert('Answer'),
  insertVote: makeInsert('Vote'),
  insertReport: makeInsert('Report'),
  getQuestions: getQuestions
}