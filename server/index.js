const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./jsmithSyllabusesService/public'));
app.use(cors());

app.get('/:courseNumber', (req, res) => {
  // console.log('GET / courseNumber: ', courseNumber);
  res.sendFile(path.resolve('./jsmithSyllabusesService/public/index.html'));
});

app.get('/api/hoursToComplete/:courseNumber', (req, res) => {
  // console.log('GET /api/hoursToComplete courseNumber: ', courseNumber);
  db.hoursToComplete(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.get('/api/syllabus/:courseNumber', (req, res) => {
  // console.log('GET /api/syllabus courseNumber: ', courseNumber);
  db.syllabus(req.params.courseNumber, (responseData) => {
    res.send(responseData);
  });
});

app.listen(port, () => {
  console.log(`Syllabus service listening at http://localhost:${port}`);
});
