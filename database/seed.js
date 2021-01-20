const db = require('./database.js');
const faker = require('faker');

let seedProducts = function(n) {
  for (let i = 0; i < n; i++) {
    let temp = faker.random.words(3);
    db.insertProduct(temp, (err, data) => {
      if (err) {
        console.log('error in seeding products function: ' + err);
      }
    })
  }
};

seedProducts(40);

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

let seedData = function(n) {
  let allData = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 3; j++) {
      let dataToSeed = [];
      dataToSeed.push(faker.name.firstName());
      let date = faker.date.past(5).toString();
      date = convertDate(date);
      dataToSeed.push(date);
      dataToSeed.push(faker.random.words(faker.random.number({min: 8, max: 20})) + '?');
      dataToSeed.push(i);
      allData.push(dataToSeed);
    }
  }
  return allData;
};

let seeds = seedData(40);

seeds.forEach((seed) => {
  db.insertQuestion(seed, (err, data) => {
    if (err) {
      console.log('error ' + err);
    }
  })
});

let seedAnswers = function(n) {
  let seedAnswers = [];
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 2; j++) {
      let thisAnswer = [];
      thisAnswer.push(faker.name.firstName());
      thisAnswer.push(faker.random.words(faker.random.number({min: 8, max: 18})) + '.');
      let date = faker.date.past(1).toString();
      date = convertDate(date);
      thisAnswer.push(date);
      thisAnswer.push(i);
      seedAnswers.push(thisAnswer);
    }
  }
  return seedAnswers;
}

let answers = seedAnswers(120);

answers.forEach((answer) => {
  db.insertAnswer(answer, (err) => {
    if (err) {
      console.log('error inserting answer from seed file: ' + err);
    }
  })
})







