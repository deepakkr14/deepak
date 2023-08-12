const path = require("path");

const express = require("express");

const expenseController = require("../controllers/expense-controller");

const router = express.Router();

router.get("/getAll", expenseController.getEverything);

router.post("/add", expenseController.postaddNew);
router.get("/delete/:id", expenseController.getDelete);
router.post("/edit", expenseController.postEdit);

module.exports = router;
