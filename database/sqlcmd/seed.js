const db = require('./database.js');
const faker = require('faker');

let producer = () => {
  let product = {};

  product.product_name =  null;
  product_name =  null;
  seller =  null;
  price =  null;
  rating =  null;
  product_code =  null;

  return product;
}

for (let i = 0; i < 100; i++) {
  db.insertProduct(producer(), err => {
    console.log('Seed Error: ' + err)
  });
}


// ==== paul's code ===
let seedProducts = function(n) {
  for (let i = 0; i < n; i++) {
    let temp = faker.random.words(3);
    db.insertProduct(temp, (err, data) => {
      if (err) {
        console.log('error inserting products from seed file: ' + err);
      }
    })
  }
};

seedProducts(100);

let convertDate = function(str) {
  let splitDates = str.split(' ');
  let year = splitDates[3];
  let day = splitDates[2];
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months.indexOf(splitDates[1]) + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let newDate = `${year}-${month}-${day}`;
  return newDate;
}

let seedQuestions = function(n) {
  let seedQuestions = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 3; j++) {
      let dataToSeed = [];
      dataToSeed.push(faker.name.firstName());
      let date = faker.date.past(5).toString();
      date = convertDate(date);
      dataToSeed.push(date);
      dataToSeed.push(faker.random.words(faker.random.number({min: 8, max: 20})) + '?');
      dataToSeed.push(i);
      seedQuestions.push(dataToSeed);
    }
  }
  return seedQuestions;
};

let questions = seedQuestions(100);

questions.forEach((question) => {
  db.insertQuestion(question, (err, data) => {
    if (err) {
      console.log('error inserting questions from seed file: ' + err);
    }
  })
});

let seedAnswers = function(n) {
  let seedAnswers = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 2; j++) {
      let answer = [];
      answer.push(faker.name.firstName());
      answer.push(faker.random.words(faker.random.number({min: 8, max: 18})) + '.');
      let date = faker.date.past(1).toString();
      date = convertDate(date);
      answer.push(date);
      answer.push(i);
      seedAnswers.push(answer);
    }
  }
  return seedAnswers;
}

let answers = seedAnswers(300);

answers.forEach((answer) => {
  db.insertAnswer(answer, (err) => {
    if (err) {
      console.log('error inserting answer from seed file: ' + err);
    }
  })
})





