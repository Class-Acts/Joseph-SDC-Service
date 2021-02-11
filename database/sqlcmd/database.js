const sql = require('mssql');
const path = require('path');
const dataPath = path.join(__dirname, 'data/');

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

let makeQuery = (input, queryTemplate, pattern) => {
  return (callback) => {
    return sql.connect(config)
      .then(pool => {
        return pool.request()
          .query(queryTemplate(input));
      })
      .then(result => {
        if (callback && pattern) {
          callback(pattern(result));
        }
      })
      .catch(err => {
          console.log(err);
      });
  };
};

let makeInsert = (tableName) => {
  return makeQuery(tableName, (input) => {
    return `BULK INSERT qanda.${input} FROM '${dataPath + input}.csv' WITH  (FORMAT = 'CSV', FIRSTROW=2, FIELDQUOTE = '\', FIELDTERMINATOR = ',', ROWTERMINATOR = '0x0a')`;
  });
};

let testQuery = makeQuery(null, () => `INSERT qanda.reports (id, username, reported_at, answer_id) VALUES (1, 'john', '2015-12-24', 1)`);

let getQuestions = makeQuery('questions', (input) => `SELECT * FROM qanda.questions LEFT OUTER JOIN answers ON answers.questions_id = questions.questionId WHERE questions.product_id = ${input}`, (result) => ({
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

/*
insertProducts and the rest have the format:
  insertProducts() => {
    return {promise chain that performs bulk insert query on products.csv file in /data.
  }

getQuestions has the format:
  getQuestions(callback) => {
    return {object with data in the format specified by pattern (the last parameter of makeQuery)}
  }
*/
module.exports = {
  sql: sql,
  makeQuery: makeQuery,
  insertProducts: makeInsert('products'),
  insertQuestions: makeInsert('questions'),
  insertAnswers: makeInsert('answers'),
  insertVotes: makeInsert('votes'),
  insertReports: makeInsert('reports'),
  getQuestions: getQuestions
}