const Expense = require("../models/expense-model");
const User = require('../models/user-model');
// const Expense = require('../models/expense-model');
const { Sequelize } = require('sequelize');

// exports.getLeaderboard = async (req, res, next) => {
//   try {
//   const leaderboardData = await User.findAll({
//       attributes: ['id', 'name', [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalExpenses']],
//       include: [
//         {
//           model: Expense,
//           attributes: [], // Exclude the expense details, only need the sum
//         },
//       ],
//       group: ['Users.id','Users.name'],
//       order: [['totalExpenses', 'DESC']],
//     });

//     res.status(200).json(leaderboardData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// };
exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await User.findAll({
      attributes: [
        'id',
        'name',
        [Sequelize.fn('sum', Sequelize.col('Expenses.amount')), 'total_expense'],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ['Users.id','Users.name'],
      order: [['total_expense', 'DESC']],
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
      console.log()
      res.json({data:data,"premium":req.user.ispremiumuser});
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
