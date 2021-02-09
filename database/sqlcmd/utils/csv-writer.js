const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const productWriter = createCsvWriter({
  path: './data/products.csv',
  header: ['id', 'name', 'seller', 'price', 'rating', 'product_code']
});

const questionWriter = createCsvWriter({
  path: './data/questions.csv',
  header: ['id', 'userName', 'asked_at', 'question', 'product_id']
});

const answerWriter = createCsvWriter({
  path: './data/answers.csv',
  header: ['id', 'userName', 'answered_at', 'answer', 'question_id']
});

const voteWriter = createCsvWriter({
  path: './data/votes.csv',
  header: ['id', 'userName', 'voted_at', 'helpful', 'answer_id']
});

const reportWriter = createCsvWriter({
  path: 'database/sqlcmd/data/reports.csv',
  header: ['id', 'userName', 'reported_at', 'answer_id']
});

module.exports = {
  productWriter: productWriter,
  questionWriter: questionWriter,
  answerWriter: answerWriter,
  voteWriter: voteWriter,
  reportWriter: reportWriter
}