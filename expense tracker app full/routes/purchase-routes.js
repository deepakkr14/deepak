
const express = require("express");
const authMiddle = require("../middleware/auth");
const router = express.Router();
const razorpayController = require("../controllers/order-controller");

router.get("/getPremium", authMiddle, razorpayController.createOrder);
router.post("/update", authMiddle, razorpayController.updateTransactionStatus);

module.exports = router;
