const express = require('express');
const PORT = 4000;
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('newrelic');
var db;


//Allow connecting to two different databases based on command line argument
if (process.argv[2] === undefined || process.argv[2] === '-tsql') {
  db = require('../database/sqlcmd/database.js');
  console.log('Connecting to t-sql db');
} else if (process.argv[2] === '-mysql') {
  db = require('../database/mysql/database.js');
  console.log('Connecting to mysql db');
}

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use((req, res, next) => {
  console.log(`Serving ${req.method} at ${req.url}`);
  next();
});

app.get('/:id', (req, res) => {
  let product = req.params.id || 20;
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>RGI faker website</title>
    </head>
    <body>
      <div product_id=${product} id="questions"></div>
      <script src="bundle.js"></script>
    </body>
  </html>
  `);
});

app.get('/api/:id', (req, res) => {
  //Start Timer (query start)
  console.time('getQuestions');
  let product = req.params.id;
  if (product !== 'favicon.ico') {
    db.getQuestions(product, (err, output) => {
      //End timer (query finished).
      console.timeEnd('getQuestions');
      let data = output.recordset;
      if (err) {
        console.log('error getting questions from db: ' + err);
      } else {
        let questionData = data.reduce((accumulator, currVal) => {
          let idKey = currVal.id[0];
          if (!accumulator[idKey]) {
            accumulator[idKey] = {
              questionId: idKey,
              question: currVal.question,
              asked_at: currVal.asked_at,
              user: currVal.username[0],
              answers: (currVal.answer !== null) ? [{
                id: currVal.id[1],
                answer: currVal.answer,
                answered_at: currVal.answered_at,
                upvotes: 42, // Needs to be changed to correctly reflect upvotes.
                user_name: currVal.username[1]
              }] : []
            };
          } else {
            accumulator[idKey].answers.push({
              id: currVal.id[1],
              answer: currVal.answer,
              answered_at: currVal.answered_at,
              upvotes: 43,
              user_name: currVal.username[1]
            })
          }
          return accumulator;
        }, {});
        res.send(Object.values(questionData));
      }
    })
  } else {
    console.log('shut the favico up!');
  }
});

app.post('/questions/:id', (req, res) => {
  let myDate = req.body.asked_at;
  let day = myDate.slice(0, 10);
  let time = myDate.slice(11, 19);
  let realDate = day + ' ' + time;
  let newQuestion = [req.body.user, realDate, req.body.question, req.body.product_id];
  db.insertQuestion(newQuestion, (err, data) => {
    if (err) {
    } else {
      let answerData = [
        'REI Service',
        'Please be patient while our support staff works on your question. Most questions are answered within 24-48 hours.',
        realDate,
        data.insertId
      ]
      db.insertAnswer(answerData, (err) => {
        if (err) {
          console.log('error seeding new question' + err);
        }
      })
      res.end();
    }
  });
});

app.post('/answers/:id', (req, res) => {
  let questionId = req.params.id;
  let answer = req.body.answer;
  let myDate = req.body.answeredAt;
  let day = myDate.slice(0, 10);
  let time = myDate.slice(11, 19);
  let realDate = day + ' ' + time;
  let user = 'you';
  let answerData = ['you', answer, realDate, questionId];
  db.insertAnswer(answerData, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.put('/:id', (req, res) => {
  let answeredAt = req.params.id;
  db.updateVotes(answeredAt, (err) => {
    if (err) {
      console.log('error updating votes');
    } else {
      res.end();
    }
  })
});

app.listen(PORT, () => {
  console.log('server listening at port: ' + PORT);
});