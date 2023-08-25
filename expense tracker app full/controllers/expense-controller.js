const User = require("../models/user-model");
const Download = require("../models/downloads-model");
const Expense = require("../models/expense-model");
const sequelize = require("../util/database");

const Userservices = require("../services/userservices");
const S3services = require("../services/s3services");

exports.getPage = async (req, res) => {
  try {
    let page = Number(req.params.no); //1
let limits=Number(req.params.limit);

   let itemsPerPage = limits;
    const totalData = await Expense.count();
    const ispremiumuser=await req.user.ispremiumuser;
    const expenses = await req.user.getExpenses({
      limit: limits, // Number of items per page
      offset: (page - 1) * itemsPerPage,
    });
    const totalPages = Math.ceil(totalData / itemsPerPage);

    let hasNextPage = false;
    let hasPreviousPage = false;
    let nextPage = null;
    let previousPage = null;

    if (page > 1) {
      hasPreviousPage = true;
      previousPage = page - 1;
    }

    if (page < totalPages) {
      hasNextPage = true;
      nextPage = page + 1;
    }

    res.status(200).json({
      premium:ispremiumuser,
      expenses,
      hasNextPage,
      hasPreviousPage,
      currentPage: page, 
      totalPages,
      nextPage,
      previousPage,
    });
  } catch {
    (err) => console.log(err);
  }
};

exports.getLinks = async (req, res) => {
  try {
    let data = await req.user.getDownloads();
    res.status(200).json(data);
    console.log(userdata);
  } catch {
    (err) => console.log(err);
  }
};

exports.getDownload = async (req, res) => {
  try {
    const expenses = await Userservices.getExpenses(req);
    const stringExpenses = JSON.stringify(expenses);
    const userId = req.user.id;
    const filename = `expense${userId}/${new Date()}.txt`;

    const fileURL = await S3services.uploadToS3(stringExpenses, filename);
    console.log(fileURL);

    const encodedDateString = fileURL.split("/").pop().replace(".txt", "");
    const decodedDateString = decodeURIComponent(encodedDateString);
    const parsedDate = new Date(decodedDateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = parsedDate.toLocaleDateString("en-US", options);

    req.user.createDownload({ date: formattedDate, fileUrl: fileURL });
    res.status(200).json({ fileURL, success: true });
  } catch (err) {
    res.status(401).send("Error while downloading the files");
  }
};
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
   
    (err) => {
      t.rollback();
      console.log(err);
    };
  }
};

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
