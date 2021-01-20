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
      let questionData = data.reduce((accumulator, currVal) => {
        if (!accumulator[currVal.questions_id]) {
          accumulator[currVal.questions_id] = {
            question: currVal.question,
            asked_at: currVal.askedAt,
            user: currVal.user,
            answers: [{
              answer: currVal.answer,
              answered_at: currVal.answered_at,
              upvotes: currVal.upvotes,
              user_name: currVal.user_name
            }]
          }
        } else {
          accumulator[currVal.questions_id].answers.push({
            answer: currVal.answer,
            answered_at: currVal.answered_at,
            upvotes: currVal.upvotes,
            user_name: currVal.user_name
          })
        }
        return accumulator;
      }, {})

      res.send(Object.values(questionData));
    }
  })
});




app.listen(PORT, () => {
  console.log('server listening at port: ' + PORT);
})

// for (let i = 0; i < data.length; i++) {
//   // create an answer object
//   let answerObj = {
//     answer: data[i].answer,
//     answered_at: data[i].answered_at,
//     id: data[i].id,
//     questionId: data[i].questions_id,
//     user_name: data[i].user_name,
//     upvotes: data[i].upvotes
//   }
//   answers.push(answerObj);
//   // if there is a new question, create question object
//   if (data[i - 1] === undefined || data[i].questions_id !== data[i - 1].questions_id) {
//     let questionObj = {
//       question: data[i].question,
//       questionId: data[i].questions_id,
//       user: data[i].user,
//       askedAt: data[i].asked_at,
//       answers: []
//     }
//     questions.push(questionObj);
//   }
// }
// for (let i = 0; i < questions.length; i++) {
//   for (let j = 0; j < answers.length; j++) {
//     if (answers[j].questionId === questions[i].questionId) {
//       questions[i].answers.push(answers[j]);
//     }
//   }
// }