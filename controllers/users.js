const User = require('../models/user');

module.exports.getUser = (req, res) => {

  User.findById(req.params.id)
    .then(user => {
      if (!user) { return res.status(404).send({ message: "Такого пользователя не существует" }) }
      res.status(200).send({ data: user })
    })
    .catch((err) => res.status(400).send({ message: "Запрашиваемый пользователь не найден" }))
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
  const { _id } = req.user;
  User.findByIdAndUpdate({ _id },
    { name, about },
    { new: true }
  )
    .then(user => {
      if (name.length < 2 || name.length > 30 || about.length < 2 || about.length > 30) {
        return res.status(400).send({ message: "Введено или меньше 2 символов или больше 30" })
      }
      res.status(200).send({ data: user })
    })
    .catch(err => res.status(400).send({ message: "Некорректные данные пользователя" }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user

  User.findByIdAndUpdate({ _id }, { avatar }, { new: true })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(400).send({ message: "Некорректная ссылка на аватар" }));
};

