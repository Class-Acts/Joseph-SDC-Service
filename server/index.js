const express = require('express');
const PORT = 4000;
const app = express();
const db = require('../database/database.js');
const bodyParser = require('body-parser');
const path = require('path');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static(path.join(__dirname, '..', 'dist')));


app.get('/:id', (req, res) => {
  let product = req.params.id;
  db.getQuestions(product, (err, data) => {
    if (err) {
      console.log('error getting questions from db: ' + err);
    } else {
      console.log('pre reduce ' + data);
      let questionData = data.reduce((accumulator, currVal) => {
        if (!accumulator[currVal.questions_id]) {
          let temp = currVal.questions_id;
          accumulator[currVal.questions_id] = {
            questionId: temp,
            question: currVal.question,
            asked_at: currVal.asked_at,
            user: currVal.user,
            answers: [{
              id: currVal.answerId,
              answer: currVal.answer,
              answered_at: currVal.answered_at,
              upvotes: currVal.upvotes,
              user_name: currVal.user_name
            }]
          }
        } else {
          accumulator[currVal.questions_id].answers.push({
            id: currVal.answerId,
            answer: currVal.answer,
            answered_at: currVal.answered_at,
            upvotes: currVal.upvotes,
            user_name: currVal.user_name
          })
        }
        return accumulator;
      }, {})
      console.log(questionData);
      res.send(Object.values(questionData));
    }
  })
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
      // db.insertAnswer()
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
  })
})

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
  })
})

app.put('/:id', (req, res) => {
  let answeredAt = req.params.id;
  db.updateVotes(answeredAt, (err) => {
    if (err) {
      console.log('error updating votes');
    } else {
      res.end();
    }
  })
})




app.listen(PORT, () => {
  console.log('server listening at port: ' + PORT);
})

