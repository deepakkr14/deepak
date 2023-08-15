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
    amount: amount, // Amount in paise
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

const updateTransactionStatus = async (req, res ) => {
  try {
      const userId = req.user.id;
      const { payment_id, order_id} = req.body;
      // console.log(order_id)
      const order  = await Order.findOne({where : {orderid : order_id}}) //2
      const promise1 =  order.update({ paymentid: payment_id, status: 'SUCCESSFUL'}) 
      const promise2 =  req.user.update({ ispremiumuser: true }) 

      Promise.all([promise1, promise2]).then(()=> {
          return res.status(202).json({sucess: true, message: "Transaction Successful" });
      }).catch((error ) => {
          throw new Error(error)
      })



  } catch (err) {
      console.log(err);
      res.status(403).json({ err: err, message: 'Sometghing went wrong' })

  }
}

module.exports = {createOrder,
  updateTransactionStatus
}
// const postTransactionStatus = async (req, res, next) => {
//   try {
//     const payment_id = req.body.payment_id;
//     const order_id = req.body.order_id;
//     const signature = req.body.signature;

//     const updatedOrder = await Order.findOne({ where: { order_id: order_id } });

//     // console.log('TRANSACTION UPDATE VALUE: ', updatedOrder);

//     // update the order with payment_id & signature
//     updatedOrder.payment_id = payment_id;
//     updatedOrder.signature = signature;
//     updatedOrder.save();

//     const updatedUser = req.user.update({ isPremium: true });

//     Promise.all([updatedOrder, updatedUser])
//       .then(() => {
//         console.log("Payment Successful");
//         res.status(202).json({
//           success: true,
//           // create new updated token and send as json
//           token: userController.generateAccessToken(
//             req.user.id,
//             req.user.name,
//             req.user.email,
//             req.user.isPremium
//           ),
//         });

//         // In the frontend it will store in the localStorage
//       })
//       .catch((err) => console.log(err));
//   } catch (error) {
//     console.log(error);
//   }
// };
// module.exports = { postTransactionStatus };
