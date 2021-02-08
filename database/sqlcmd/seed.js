const db = require('./database.js');
const faker = require('faker');
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
      name: faker.commerce.productName();
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
      user: faker.internet.userName(),
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
      user: faker.internet.userName(),
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
      user: faker.internet.userName(),
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
      user: faker.internet.userName(),
      reported_at: convertDate(faker.date.past(1).toString()),
      answer_id: answer_id
    });
  }
};

//Promise loop that iterates batchesTotal number of times
  //Create batchSize number of products and corresponding items.
  let batches = seedProducts(batchSize);

  //Write batches to files in ./data.

  //Use db to BULK INSERT data files into database