// const uuid = require('uuid');
const Brevo = require('@getbrevo/brevo');
// const bcrypt = require('bcrypt');
const User = require('../models/user-model');


exports.postForgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        res.status(405).json({ success: false });

     console.log('User with this email id not exists');
      return;
    }

    // User exists
    const id = process.env.BREVO_API_KEY
    // await user.createForgotPassword({ id, active: true });

    const defaultClient = Brevo.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new Brevo.TransactionalEmailsApi();

    const sender = {
      email: 'deepakbipin147@gmail.com',
      name: 'forget password',
    };

    const receivers = [
      {
        email: req.body.email,
      },
    ];

    const response = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Sending for trial purpose',
      textContent: 'reset password',
      htmlContent: `<h4>Expense-Tracker Password Reset Link</h4>
    //   <a href="http://localhost:4000/password/reset/${id}">Reset Password</a>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};
