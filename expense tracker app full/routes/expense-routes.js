const path = require("path");
const jwt=require("jsonwebtoken")
const express = require("express");
const authMiddle = require('../middleware/auth')
const expenseController = require("../controllers/expense-controller");

const router = express.Router();

router.get("/getAll",authMiddle, expenseController.getEverything);
router.get("/leaderboard",authMiddle, expenseController.getLeaderboard);
router.get("/user/download",authMiddle, expenseController.getDownload);
router.post("/add",authMiddle, expenseController.postaddNew);
router.get("/delete/:id",authMiddle, expenseController.getDelete);
router.post("/edit", authMiddle,expenseController.postEdit);
router.get("/getlinks", authMiddle,expenseController.getLinks);
router.get("/page/:no/:limit", authMiddle,expenseController.getPage);

module.exports = router;
