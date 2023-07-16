const express=require("express");
const path=require("path")
const dirnamee=require("../util/path")

const router=express.Router();
router.get("/add-products", (req, res) => {

  res.sendFile(path.join(dirnamee,'views/','add-products.html'))
    // res.send(
    //   `<form action="/admin/product"method="POST"><input type="text" name ="title">
    //   <input type="text" name ="title2"><button>send</button> </form>`
    // );
  });
  
  router.post("/product", (req, res) => {
    console.log(req.body);
    res.redirect("/");
  });







module.exports=router;

