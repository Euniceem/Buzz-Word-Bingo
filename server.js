const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'));

const data = {
  "buzzWords": [
    {
      "buzzWord": "Wassup",
      "points": 50
    }
  ],
  "totalScore": 0
};



// GET /
app.get('/', (req, res) => {
  res.status(200).sendFile('index');
});

//GET /buzzwords
app.get('/buzzwords', (req, res) => {
  res.status(200).json(data);
});

//POST /buzzwords
app.post('/buzzwords', (req, res) => {
  let body = req.body;
  let dataBody = data.buzzWords;

  if (!typeof body.buzzWord === 'string' &&
    (!typeof body.points === 'number') &&
    dataBody.length < 5) {
    return res.status(500).send(`{Error: Please provide a valid buzzword and points}`)
  } else {
    let newBody = {};
    newBody.buzzWord = body.buzzWord;
    newBody.points = parseInt(body.points);
    data.buzzWords.push(newBody);
    res.status(200).send(`{"success": true}`);
  }
});

//PUT /buzzwords
app.put('/buzzwords', (req, res) => {
  let body = req.body;
  let dataBody = data.buzzWords;

  for (var i = 0; i < dataBody.length; i++) {

    if (typeof body.buzzWord === 'string' &&
      body.buzzWord === dataBody[i].buzzWord &&
      dataBody.length < 5) {
      dataBody[i].points = parseInt(body.points);
      res.status(200).send(`{"success": true}`);
    } else {
      return res.status(500).send(`{Error: Please provide a valid buzzword and points}`);
    }
  }
});

//DELETE /buzzwords
app.delete('/buzzwords', (req, res) => {
  let body = req.body;
  let dataBody = data.buzzWords;

  for (var i = 0; i < dataBody.length; i++) {

    if (dataBody[i].buzzWord.includes(body.buzzWord)) {
      dataBody.splice(i, 1);
      res.status(200).send(`{"success": true}`);
    } else {
      return res.status(500).send(`{Error: The buzzword you provided does not exist}`);
    }
  }
});

//POST /reset
app.post('/reset', (req, res) => {
  let dataBody = req.body;

  for (var i = 0; i < dataBody.length; i++) {
    if (dataBody.length === 0) {
      return res.status(500).send(`{Error: There are no buzzwords to clear}`);
    } else {
      dataBody.splice(dataBody.length);
      res.status(200).send(`{"success": true}`);
    }
  }
});

//POST /heard
app.post('/heard', (req, res) => {

});


const server = app.listen(3000, () => {
  const host = server.address().address;
  const post = server.address().port;

  console.log(`Example app listening at http://${host}:${post}`);
})