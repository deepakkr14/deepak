const http = require("http");
const express = require("express");
const chat = express();
chat.use(express.json());

// Parse URL-encoded bodies
chat.use(express.urlencoded({ extended: true }));
chat.use("/add-product", (req, res, next) => {
  res.send(
    `<form action="/product"method="POST"><input type="text" name ="title"><input type="text" name ="title2"><button>send</button> </form>`
  );
});

chat.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

chat.use("/", (req, res, next) => {
//   console.log("in the 2nd  middleware");
  next();
});

// const mod=require("./shortcut")
const server = http.createServer(chat);
server.listen(8003, () => {
  console.log("server is running in the background");
});
