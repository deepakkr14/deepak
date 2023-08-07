const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/getAll", shopController.getEverything);

router.post("/add", shopController.postaddNew);
router.get("/delete/:id", shopController.getDelete);
router.post("/edit", shopController.postEdit);

module.exports = router;
