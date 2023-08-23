const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const Brevo = require("@getbrevo/brevo");

const User = require("../models/user-model");
const Password = require("../models/password-model");

exports.postForgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(405).json({ success: false });

      console.log("User with this email id not exists");
      return;
    }

    const UID = uuid.v4();
    // User exists
    await user.createPassword({ id: UID, isActive: true });

    const defaultClient = Brevo.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new Brevo.TransactionalEmailsApi();

    const sender = {
      email: "deepakbipin147@gmail.com",
      name: "forget password",
    };

    const receivers = [
      {
        email: req.body.email,
      },
    ];

    const response = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Sending for trial purpose",
      textContent: "reset password",
      htmlContent: `<h4> Password Reset Link</h4>
       <a href="http://localhost:3005/password/reset/${UID}">Reset Password</a>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.postPasswordReset = async (req, res, next) => {
  const ui = req.params.uid;
  console.log(ui);

  const found = await Password.findOne({ where: { id: ui, isActive: true } });
if(!found){res.send("reset password link is expired")}
 else{ await found.update({ isActive: false });

  res.status(200).send(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- Required meta tags -->
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  
      <!-- Bootstrap CSS -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
  
      <title>Reset Password</title>
    </head>
    <body>
      <div class="container">
        <div class="col-xl-6 col-sm-8 m-4">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title mb-4">Update Your Password</h2>
              <form  id="reset-form">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
              
                      <label for="newPassword" class="form-label">New Password</label>
                      <input
                        type="password"
                        id="newPassword"
                        class="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-3 mb-3">
                  <button type="submit" class="btn btn-outline-primary">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      // <script
      //   src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      //   integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      //   crossorigin="anonymous"
      // ></script>
      <script>   
      

          const form = document.querySelector('#reset-form');
          form.addEventListener('submit', initiate);
          function initiate(e){

            e.preventDefault();
            let newPass=document.getElementById("newPassword").value;
            console.log("request sent")
            axios.post("http://localhost:3005/password/update/${ui}",{pass:newPass})
                .then((res)=>{
                  console.log(res)
                  if (res.data ) {
                    alert("Your New Passowrd is created ")
                    window.close();
                      }})
                      .catch((error)=>{
                        alert(error)})
                        
            console.log('called');
          }
      </script>
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    </body>
  </html>
  `);

  res.end();}
};

exports.postPasswordUpdate = async (req, res, next) => {
  const newPassword = req.body.pass;

  try {
    const ui = req.params.uid;
    const requser = await Password.findOne({ where: { id: ui } });

    const passcnguser = await User.findOne({ where: { id: requser.userId } });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await passcnguser.update({
      password: hashedPassword,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while changing password" });
  }
};
