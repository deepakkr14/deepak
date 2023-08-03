const Users = require("../models/product");

exports.postaddNew = (req, res, next) => {
  const name = req.body.name;
  const contact = req.body.email;
  const phone = req.body.phone;
  console.log(req.body);

  Users.create({
    name,
    phone,
    contact,
  })
    .then((result) => {
      console.log("Appointment Created");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.postEdit = (req, res, next) => {
  const id = req.params.id;

  console.log(id);
  Users.findByPk(id)

    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};
exports.postEditUpdate = (req, res, next) => {
  const id = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  console.log(req.body);
  Users.findByPk(id)
    .then((User) => {
      User.name = name;
      User.contact = email;
      User.phone = phone;
      return User.save();
    })
    .then((updatedUser) => {
      console.log("Appointment Updated");
      res.json(updatedUser);
    })

    .catch((err) => console.log(err));
};

exports.postDelete = (req, res, next) => {
  id = req.params.id;

  Users.destroy({ where: { id } }).then((data) => {
    res.json(data);
    console.log("deleted");
  });
};
exports.getEverything = (req, res, next) => {
  Users.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};
