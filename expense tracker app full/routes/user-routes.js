const path = require("path");

const express = require("express");

const shopController = require("../controllers/exp-controller");

const router = express.Router();


// router.get("/getAll", shopController.getEverything);

router.post("/users/singup", shopController.postaddNew);

// router.get("/delete/:id", shopController.postDelete);


module.exports = router;
