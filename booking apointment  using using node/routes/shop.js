const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();


router.get("/getAll", shopController.getEverything);

router.post("/add", shopController.postaddNew);

router.get("/delete/:id", shopController.postDelete);

router.get("/edit/:id", shopController.postEdit);
router.post("/edits", shopController.postEditUpdate);

module.exports = router;
