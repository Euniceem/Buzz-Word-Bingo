const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
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
  res.status(200);
  res.sendFile('index');
});

//GET /buzzwords
app.get('/buzzwords', (req, res) => {
  res.json(data);
})

//POST /buzzwords
app.post('/buzzwords', (req, res) => {
  let body = req.body;

  if (!typeof body.buzzWord === 'string' || typeof body.points === 'number') {
    res.status(500);
    return res.send(`{Error: Please provide a valid buzzword and points}`)
  } else {
    let newBody = {};
    newBody.buzzWord = body.buzzWord;
    newBody.points = parseInt(body.points);
    data.buzzWords.push(newBody);
    res.status(200);
    res.send(`{"success": true}`);
  }
})

//PUT /buzzwords
app.put('/buzzwords', (req, res) => {
  let body = req.body;
  console.log("BODY: ", body);
  if (typeof body.buzzWord === 'string') {

  }

})


const server = app.listen(3000, () => {
  const host = server.address().address;
  const post = server.address().port;

  console.log(`Example app listening at http://${host}:${post}`);
})