const User = require("../models/user-model");
const Expense = require("../models/expense-model");
const Sequelize = require("sequelize");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ["id", "name", "totalExpense"],
      order: [["totalExpense", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.postaddNew = (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;

  req.user
    .createExpense({
      // Expense.create({
      amount: amount,
      description: description,
      category: category,
    })
    .then((result) => {
      const updatedTotalExpense = req.user.totalExpense + Number(amount);
      req.user.update({ totalExpense: updatedTotalExpense });

      console.log("Appointment Created");
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.getEverything = (req, res, next) => {
  // Expense.findAll()
  req.user
    .getExpenses()
    .then((data) => {
      if (data == null) {
        res.json({ data: "nodata", premium: req.user.ispremiumuser });
      }
      console.log();
      res.json({ data: data, premium: req.user.ispremiumuser });
    })
    .catch((err) => console.log(err));
};
exports.getDelete = async (req, res, next) => {
  let id = req.params.id;
  try {
    const expense = await Expense.findByPk(id);
    const previousPrice = expense.amount;
    const result = await expense.destroy();

    // updating total expense of user table
    const updatedTotalExpense = req.user.totalExpense - Number(previousPrice);
    await req.user.update({ totalExpense: updatedTotalExpense });

    console.log(`deleted ${id}`);
    res.json({ success: true, data: {} });
  } catch {
    (err) => console.log(err);
  }
};
exports.postEdit = async (req, res, next) => {
  const id = req.body.userId;
  const amount = Number(req.body.amount);
  const description = req.body.description;
  const category = req.body.category;
  console.log(req.body);
  try {
    const expense = await Expense.findByPk(id);
    const previousPrice = expense.amount;
    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    const updatedExpense = await expense.save();
    const updatedTotalExpense =
      req.user.totalExpense - Number(previousPrice) + Number(amount);
    await req.user.update({ totalExpense: updatedTotalExpense });
    console.log("Record Updated");
    res.json(updatedExpense);
  } catch (error) {
    console.log(error);
  }
};
