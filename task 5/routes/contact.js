const  express = require("express");
const path=require("path");
const router= express.Router();
const contr= require("../controllers/complete")
router.use("/contactus",contr.contactus)

module.exports=router