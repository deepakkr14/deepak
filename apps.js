const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  //   console.log(req);
  if (url === "/") {
    const messages = fs.readFileSync("message.txt", "utf8");
    // const messageList = messages.split("\n").filter((message) => message.trim() !== "");
    res.write("<html>");
    res.write("<head><title>My Page</title></head>");
    res.write("<body>");
    res.write(messages);
    res.write('<form action="/message" method="POST">');
    res.write('<input type="text" name="message">');
    res.write('<button type="submit">Send</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");

    return res.end();
  } else if (url === "/message" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      return res.end();
    });
  }
});
server.listen(8004);
