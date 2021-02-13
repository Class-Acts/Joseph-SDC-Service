const sql = require('mssql');
const path = require('path');
// const dataPath = path.join(__dirname, 'data');
const dataPath = '/csvs';

const config = {
  user: 'student',
  password: 'Qandapass1234',
  server: 'localhost',
  database: 'qanda',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 1800000
  },
  stream: true
};

//Use a single connection pool
const pool = new sql.ConnectionPool(config)
const poolConnect = pool.connect()

//Enables error handler on connections.
pool.on('error', err => {
  console.log(err);
});

let count = 0;
pool.on('connect', () => {
  console.log(count++);
});


let makeQuery = (tableName, queryTemplate, pattern) => {
  return (input, callback) => {
    return poolConnect
      .then(pool => {
        return pool.request()
          .query(queryTemplate(tableName, input));
      })
      .then(result => {
        if (callback && pattern) {
          callback(null, pattern(result));
        }
      })
      .catch(err => {
        if (callback) {
          callback(err);
        }
      });
  };
};

let makeInsert = (tableName) => {
  return makeQuery(tableName, (input) => {
    return `BULK INSERT qanda.${input} FROM '${dataPath + '/' + input}.csv' WITH  (DATAFILETYPE = 'char', FIRSTROW=2, FIELDQUOTE = '"', FIELDTERMINATOR = '|', ROWTERMINATOR = '0x0A')`;
  });
};

let addIndexes = (tableName, input) => {
  let indexer = makeQuery('', () => {
    let indexQuery = `CREATE INDEX ${input}_id_index ON qanda.${tableName} (${input}_id)`;
    return indexQuery;
  });
  return indexer();
};

let getQuestions = makeQuery('questions', (tableName, input) => {
  let query = `SELECT * FROM qanda.questions AS qs LEFT OUTER JOIN qanda.answers AS an ON qs.id = an.question_id WHERE qs.product_id = ${input}`;
  return query;
}, result => result);

let insertQuestion = (newQuestion, cb) => {
  let values = `"${newQuestion[0]}", "${newQuestion[1]}", "${newQuestion[2]}", ${newQuestion[3]}`;
  return makeQuery('', () => (`INSERT INTO qanda.questions (username, asked_at, question, product_id) VALUES (${input})`),
  (result) => {
    return {insertId: result} //Find what result is and extract the question_id
  });
};

let closePool = () => {
  pool.close();
};
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
  addIndexes: addIndexes,
  closePool: closePool,
  getQuestions: getQuestions,
  insertQuestion, insertQuestion
}