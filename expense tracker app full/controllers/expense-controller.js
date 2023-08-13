const Expense = require("../models/expense-model");

exports.postaddNew = (req, res, next) => {
  console.log(req.body + "controller ");
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
req.user.createExpense({
  // Expense.create({
    amount: amount,
    description: description,
    category: category,
  })
    .then((result) => {
      console.log("Appointment Created");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getEverything = (req, res, next) => {
  // Expense.findAll()
  req.user.getExpenses()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};
exports.getDelete = (req, res, next) => {
  let id = req.params.id;

  Expense.destroy({ where: { id: id } })
    .then((data) => {
      console.log(`deleted ${id}`);
      res.json(data);
    })
    .catch((err) => console.log(err));
};
exports.postEdit = async (req, res, next) => {
  const id = req.body.userId;
  const amount = Number(req.body.amount);
  const description = req.body.description;
  const category = req.body.category;
  console.log(req.body);
  try {
    const expense = await Expense.findByPk(id);

    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    const updatedExpense = await expense.save();

    console.log("Record Updated");
    res.json(updatedExpense);
  } catch (error) {
    console.log(error);
  }
};
