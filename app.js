const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res, next) => {
  req.user = {
    _id: '62a2e163f32cfdd65840a0f5'
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT)