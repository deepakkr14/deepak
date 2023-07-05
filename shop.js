const express=require("express");
const  router=express.Router();
router.get("/", (req, res, next) => {
    //   console.log("in the 2nd  middleware");
    res.send("feeff")
    // next();
  });

module.exports=router;