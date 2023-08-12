const path = require("path");

const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();


// router.get("/getAll", userController.getEverything);

router.post("/users/singup", userController.postaddNew);
router.post("/users/login", userController.postlogin);

// router.get("/delete/:id", userController.postDelete);


module.exports = router;
