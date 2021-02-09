const db = require('./database.js');
const fs = require('fs');
const faker = require('faker');
const csv = require('./utils/csv-writer.js');
const {questionChance, answerChance, voteChance, reportChance, rInt, convertDate} = require('./utils/utils.js');
const batchSize = 10000; //10,000 products, 0-70,000 questions, 0-280,000 answers/Votes/Reports
const batchesTotal = 1000; //10,000,000 products


//Track the current id in the database
let productIdCount = 0;
let questionIdCount = 0;
let answerIdCount = 0;
let voteIdCount = 0;
let reportIdCount = 0;

let seedProducts = function(n) {
  let batches = {
    productBatch: [],
    questionBatch: [],
    answerBatch: [],
    voteBatch: [],
    reportBatch: []
  }

  for (let batchEnd = productIdCount + batchSize; productIdCount < batchEnd; productIdCount++) {
    //Create a single product and add it to the product batch to add to csv in preparation for bulk insert.
    batches.productBatch.push({
      id: productIdCount,
      name: faker.commerce.productName(),
      seller: faker.company.companyName(),
      price: faker.commerce.price(.99,999.99,2),
      rating: (rInt(1, 50) * .1),
      product_code:  rInt(100000,999999)
    });

    //Add a random number of questions based on chance (defined in utils)
    seedQuestions(questionChance(), batches);
  }

  return batches;
};

let seedQuestions = (n, batches) => {
  for (let batchEnd = questionIdCount + n; questionIdCount < batchEnd; questionIdCount++) {
    //Create one question and push it to questionBatch. Note that id is set to globally scoped questionIdCount.
    batches.questionBatch.push({
      id: questionIdCount,
      userName: faker.internet.userName(),
      asked_at: convertDate(faker.date.past(5).toString()),
      question: (faker.random.words(rInt(8, 20)) + '?'),
      product_id: product_id
    });

    //Add a random number of answers based on chance
    seedAnswers(answerChance(), batches);
  }
};

let seedAnswers = (n, batches) => {
  for (let batchEnd = answerIdCount + n; answerIdCount < batchEnd; answerIdCount++) {
    //Create one answer and push it to answerBatch.
    batches.answerBatch.push({
      id: answerIdCount,
      userName: faker.internet.userName(),
      answered_at: convertDate(faker.date.past(1).toString()),
      answer: (faker.random.words(rInt(8, 18)) + '.'),
      question_id: question_id
    });

    //Add a random number of votes and reports
    seedVotes(voteChance(), batches);
    seedReports(reportChance(), batches);
  }
};

let seedVotes = (n, batches) => {
  for (let batchEnd = voteIdCount + n; voteIdCount < batchEnd; voteIdCount++) {
    //Create one vote and push it to voteBatch.
    batches.voteBatch.push({
      id: voteIdCount,
      userName: faker.internet.userName(),
      voted_at: convertDate(faker.date.past(1).toString()),
      helpful: faker.random.boolean(),
      answer_id: answer_id
    });
  }
};

let seedReports = (n, batches) => {
  for (let batchEnd = reportIdCount + n; reportIdCount < batchEnd; reportIdCount++) {
    //Create one report and push it to reportBatch.
    batches.reportBatch.push({
      id: reportIdCount,
      userName: faker.internet.userName(),
      reported_at: convertDate(faker.date.past(1).toString()),
      answer_id: answer_id
    });
  }
};

//Promise loop that iterates batchesTotal number of times

  console.time("batch");
  // //Create batchSize number of products and corresponding items.
  // let records = seedProducts(batchSize);

  // //Write batches to files in ./data.
  // csv.productWriter.writeRecords(records.productBatch);
  // csv.questionWriter.writeRecords(records.questionBatch);
  // csv.answerWriter.writeRecords(records.answerBatch);
  // csv.voteWriter.writeRecords(records.voteBatch);
csv.reportWriter.writeRecords([records.reportBatch])
  .catch( err => {
    console.log('CSV-WRITER Err: ' + err);
  })
  .then(() => {
    //Use db to BULK INSERT data files into database
    console.log('File Write Success');
    db.insertReport('reports', err => {
      console.log('insertReport error: ' + err);
    });
  })
  .catch(err => {
    console.log('Error catch after insertReport: ' + err);
  })
  .then(() => {
    // Clean csv file
    if (false) {
      fs.writeFile('database/sqlcmd/data/reports.csv','', (err) => {
        if (err) {
          console.log('FS clean file error: ' + err);
        } else{
          console.log('The file has been saved!');
        }
      });
    }
  })
  .then(() => {
    console.timeEnd("batch");
  })
  .catch( err => {
    console.log(err);
  });

