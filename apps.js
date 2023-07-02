const http = require("http");
const mod=require("./shortcut")
const server = http.createServer(mod.handler);
server.listen(8004);
