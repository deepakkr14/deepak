const express=require("express");
const router=express.Router();
router.use("/add-product", (req, res, next) => {
    res.send(
      `<form action="/admin/product"method="POST"><input type="text" name ="title"><input type="text" name ="title2"><button>send</button> </form>`
    );
  });
  
  router.use("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
  });







module.exports=router;

