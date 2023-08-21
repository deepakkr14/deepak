const express = require("express");

const passwordController = require("../controllers/password-controller");

const router = express.Router();

router.post("/password/forgot", passwordController.postForgotPassword);
router.get("/password/reset/:uid", passwordController.postPasswordReset);
router.post("/password/update/:uid", passwordController.postPasswordUpdate);

module.exports = router;
