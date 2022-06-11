const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

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