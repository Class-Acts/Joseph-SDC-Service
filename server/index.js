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


app.get('/products/:id', (req, res) => {
  debugger;
  let product = req.params.id;
  db.getQuestions(product, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  })
});



app.listen(PORT, () => {
  console.log('server listening at port: ' + PORT);
})
