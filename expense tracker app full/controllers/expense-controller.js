const User = require("../models/user-model");
const Expense = require("../models/expense-model");
const sequelize = require("../util/database");

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

exports.postaddNew = async (req, res, next) => {
  const t = await sequelize.transaction();
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  try {
    const expense = await req.user.createExpense(
      {
        // Expense.create({
        amount: amount,
        description: description,
        category: category,
      },
      { transaction: t }
    );

    const updatedTotalExpense = req.user.totalExpense + Number(amount);

    await req.user.update(
      { totalExpense: updatedTotalExpense },
      { transaction: t }
    );
    await t.commit();
    console.log("Expense added");
    res.status(200).json(expense);
  } catch {
    // )
    (err) => {
      t.rollback();
      console.log(err);
    };
  }
};
// }
exports.getEverything = async (req, res, next) => {
  // Expense.findAll()
  try {
    const data = await req.user.getExpenses();

    res.json({ data: data, premium: req.user.ispremiumuser });
  } catch {
    (err) => console.log(err);
  }
};

exports.getDelete = async (req, res, next) => {
  const t = await sequelize.transaction();
  let id = req.params.id;
  try {
    const expense = await Expense.findByPk(id);
    const previousPrice = expense.amount;
    // const result = await expense.destroy();
    const result = await expense.destroy({ transaction: t });
    // updating total expense of user table
    const updatedTotalExpense = req.user.totalExpense - Number(previousPrice);

    await req.user.update(
      { totalExpense: updatedTotalExpense },
      { transaction: t }
    );
    await t.commit();
    console.log(`deleted ${id}`);
    res.json({ success: true, data: {} });
  } catch {
    (err) => {
      t.rollback();
      console.log(err);
    };
  }
};
exports.postEdit = async (req, res, next) => {
  const t = await sequelize.transaction();
  const id = req.body.userId;
  const amount = Number(req.body.amount);
  const description = req.body.description;
  const category = req.body.category;
  try {
    const expense = await Expense.findByPk(id);
    const previousPrice = expense.amount;
    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    const updatedExpense = await expense.save({ transaction: t });
    const updatedTotalExpense =
      req.user.totalExpense - Number(previousPrice) + Number(amount);

    await req.user.update(
      { totalExpense: updatedTotalExpense },
      { transaction: t }
    );
    await t.commit();
    console.log("Record Updated");
    res.json(updatedExpense);
  } catch (error) {
    await t.rollback();
    console.log(error);
  }
};
