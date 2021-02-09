const sql = require('mssql');
const path = require('path');
const dbOptions = {
  path: path.join(__dirname, 'data/')
};

const config = {
  user: 'student',
  password: 'Qandapass1234',
  // user: 'SA',
  // password: 'Summersun_7',
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

let makeQuery = (input, queryTemplate, pattern) => {
  return (input, callback) => {
    sql.connect(config)
      .then(pool => {
        return pool.request()
          .query(queryTemplate(input));
      })
      .then(result => {
        if (callback && pattern) {
          callback(null, pattern(result));
        }
      })
      .catch(err => {
          console.log(err);
      });
  };
};

let makeInsert = (tableName) => {
  return makeQuery(tableName, (input) => {
    return `BULK INSERT qanda.${input} FROM '${dbOptions.path + input}.csv' WITH  (FORMAT = 'CSV', FIRSTROW=1, FIELDQUOTE = '\', FIELDTERMINATOR = ',', ROWTERMINATOR = '0x0a')`;
  });
};

let testQuery = makeQuery(null, () => `INSERT qanda.reports (id, username, reported_at, answer_id) VALUES (1, 'john', '2015-12-24', 1)`);

let getQuestions = makeQuery('questions', (input) => `SELECT * FROM questions LEFT OUTER JOIN answers ON answers.questions_id = questions.questionId WHERE questions.product_id = ${input}`, (result) => ({
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
  insertProduct: makeInsert('product'),
  insertQuestion: makeInsert('question'),
  insertAnswer: makeInsert('answer'),
  insertVote: makeInsert('vote'),
  insertReport: makeInsert('report'),
  getQuestions: getQuestions
}