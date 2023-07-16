const express=require("express");
const path=require("path")
const  router=express.Router();
const contr=require("../controllers/complete")
router.get("/",contr.shopget );

module.exports=router ;