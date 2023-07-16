const express=require("express");
router=express.Router();
const suce=require("../controllers/complete")
router.use("/success",suce.succesp)

module.exports=router