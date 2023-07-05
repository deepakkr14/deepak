const http = require("http");
const express = require("express");
const chat = express();

const adminroutes = require("./routes/admin");
const shopuser = require("./routes/shop");


chat.use(express.json());
// Parse URL-encoded bodies
chat.use(express.urlencoded({ extended: true }));
chat.use('/admin',adminroutes);
chat.use(shopuser)
chat.use((req,res,next)=> {
  res.status(404).send('page not found')
})


// const mod=require("./shortcut")
const server = http.createServer(chat);
server.listen(8003, () => {
  console.log("server is running in the background");
});
