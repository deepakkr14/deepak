const Order = require("../models/order-model");

const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});
const amount = 2500;

const createOrder = async (req, res) => {
  const options = {
    amount: amount,
    currency: "INR",
    receipt: "order_receipt",
  };
  try {
    const order = await razorpay.orders.create(options);
    await req.user.createOrder({ orderid: order.id });
    res.json({ order: order, key_id: KEY_ID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    // const userId = req.user.id;
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ ispremiumuser: true });

    Promise.all([promise1, promise2])
      .then(() => {
        return res
          .status(202)
          .json({ sucess: true, message: "Transaction Successful" });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: err, message: "Sometghing went wrong" });
  }
};

module.exports = { createOrder, updateTransactionStatus };
