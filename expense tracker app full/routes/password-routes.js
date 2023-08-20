const express = require("express");

const passwordController = require("../controllers/password-controller");

const router = express.Router();

router.post("/password/forgot", passwordController.postForgotPassword);

module.exports = router;
