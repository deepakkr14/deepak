const Users = require("../models/product");

exports.postaddNew = (req, res, next) => {
  const item = req.body.item;
  const price = req.body.price;
  const table = req.body.table;
  console.log(req.body);

  Users.create({
    item,price,table
  })
    .then((result) => {
      console.log("Appointment Created");
      res.json(result);
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
  