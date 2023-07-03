const http = require("http");
const express = require("express");
const chat = express();
chat.use((req, res, next) => {
  console.log("in the middleware");
  next();
});

chat.use((req, res, next) => {
  console.log("in the 2nd  middleware");
  res.send("<h7> heppy birthday</h7>");
});

const server = http.createServer(chat);
server.listen(8003, () => {
  console.log("server is running in the background");
});
