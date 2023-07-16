const express = require("express");
const chat = express();
const path=require("path")
//  first method
const bodyparser = require("body-parser");
chat.use(bodyparser.urlencoded({ extended: true }));

//  2nd method
// chat.use(express.json());
// chat.use(express.urlencoded({ extended: true }));

// using external routes
const adminrout = require("./routes/admin");
const shoprout = require("./routes/shop");

chat.use(adminrout);
chat.use(shoprout);

chat.use("/contactus",(req,res)=>{
  res.sendFile(path.join(__dirname,'views','contactus.html'))
})
chat.use("/success",(req,res)=>{
  res.send("form succesfully filled")
})



chat.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname,'views','notfount.html'))
});


chat.listen(8003, () => {
  console.log("server is running in the 8003");
});
