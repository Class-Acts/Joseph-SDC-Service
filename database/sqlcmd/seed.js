const db = require('./database.js');
const fs = require('fs');
const faker = require('faker');
const csv = require('./utils/csv-writer.js');
const Promise = require('bluebird');
const path = require('path');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const {questionChance, answerChance, voteChance, reportChance, rInt, convertDate} = require('./utils/utils.js');
const dataPath = path.join(__dirname, 'data/');
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 1
  },
  wordsPerSentence: {
    max: 8,
    min: 2
  }
});

const batchSize = 1000; //1,000 products, 0-7,000 questions, 0-28,000 answers/Votes/Reports
const batchesTotal = 10000; //10,000,000 products

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
      rating: Number(rInt(0, 5) + '.' + rInt(0, 9)),
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
      question: lorem.generateParagraphs(1).slice(0, -1) + '?',
      product_id: productIdCount
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
      answer: lorem.generateParagraphs(1),
      question_id: questionIdCount
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
      helpful: rInt(0, 1),
      answer_id: answerIdCount
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
      answer_id: answerIdCount
    });
  }
};

console.log(`Seeding ${batchesTotal} batches`)
console.time("total");

//Promise loop that iterates batchesTotal number of times
Promise.each(new Array(batchesTotal), (val, index) => {
  //Log progress to console and start timer
  console.log(`Saving ${index}/${batchesTotal}`)
  console.time("time");

  //Create batchSize number of products and corresponding items.
  let records = seedProducts(batchSize);
  // return Promise.resolve('Start')
  return csv.writeAll(records)
    .catch(err => {
      console.log('CSV save error: ' + err);
    })
    .then(() => {
      return db.insertProducts();
    })
    .then(() => {
      return db.insertQuestions();
    })
    .then(() => {
      return db.insertAnswers();
    })
    .then(() => {
      return db.insertVotes();
    })
    .then(() => {
      return db.insertReports();
    })
    .catch(err => {
      console.log('db.insert error: ' + err);
    })
    .then(() => {
      // Clean csv files
      fs.writeFileSync('database/sqlcmd/data/products.csv','');
      fs.writeFileSync('database/sqlcmd/data/questions.csv','');
      fs.writeFileSync('database/sqlcmd/data/answers.csv','');
      fs.writeFileSync('database/sqlcmd/data/votes.csv','');
      fs.writeFileSync('database/sqlcmd/data/reports.csv','');
    })
    .then(() => {
      //End timer
      console.timeEnd("time");
    })
    .catch( err => {
      console.log('FS.WRITEFILE cleaning err: ' + err);
    });

})
.catch( err => {
  console.log(err);
})
.then(() => {
  console.timeEnd("total");
  db.closePool();
});
