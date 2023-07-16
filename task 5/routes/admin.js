const express = require("express");
const path = require("path");
const dirnamee = require("../util/path");

const router = express.Router();
const contr = require("../controllers/complete");
router.get("/add-products", contr.adminget);

router.post("/product",contr.adminpost );

module.exports = router;
