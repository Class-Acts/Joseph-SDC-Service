const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const productWriter = createCsvWriter({
  path: 'database/sqlcmd/data/products.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'name', title: 'name'},
    {id: 'seller', title: 'seller'},
    {id: 'price', title: 'price'},
    {id: 'rating', title: 'rating'},
    {id: 'product_code', title: 'product_code'}
  ]
});

const questionWriter = createCsvWriter({
  path: 'database/sqlcmd/data/questions.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'userName', title: 'userName'},
    {id: 'asked_at', title: 'asked_at'},
    {id: 'question', title: 'question'},
    {id: 'product_id', title: 'product_id'}
  ]
});

const answerWriter = createCsvWriter({
  path: 'database/sqlcmd/data/answers.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'userName', title: 'userName'},
    {id: 'answered_at', title: 'answered_at'},
    {id: 'answer', title: 'answer'},
    {id: 'question_id', title: 'question_id'}
  ]
});

const voteWriter = createCsvWriter({
  path: 'database/sqlcmd/data/votes.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'userName', title: 'userName'},
    {id: 'voted_at', title: 'voted_at'},
    {id: 'helpful', title: 'helpful'},
    {id: 'answer_id', title: 'answer_id'}
  ]
});

const reportWriter = createCsvWriter({
  path: 'database/sqlcmd/data/reports.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'userName', title: 'userName'},
    {id: 'reported_at', title: 'reported_at'},
    {id: 'answer_id', title: 'answer_id'}
  ]
});

let writeAll = (records) => {
  return productWriter.writeRecords(records.productBatch)
    .then( () => {
      return questionWriter.writeRecords(records.questionBatch);
    })
    .then( () => {
      return answerWriter.writeRecords(records.answerBatch);
    })
    .then( () => {
      return voteWriter.writeRecords(records.voteBatch);
    })
    .then( () => {
      return reportWriter.writeRecords(records.reportBatch);
    })
    .catch( err => {
      console.log('CSV-WRITER Err: ' + err);
    })
};

module.exports = {
  writeAll: writeAll
}