const User = require('../models/user');

module.exports.getUser = (req, res) => {

  User.findById(req.params.id)
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(400).send({ message: "Запрашиваемый пользователь не найден" }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(400).send({ message: "Некорректные данные пользователя" }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findOneAndUpdate({ name, about })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(400).send({ message: "Некорректные данные пользователя" }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findOneAndUpdate({ avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(400).send({ message: "Некорректная ссылка на аватар" }));
};

