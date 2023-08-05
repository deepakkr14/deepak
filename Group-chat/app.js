const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 4000;

app.get("/login", (req, res, next) => {
  res.send(`<main>
                <h1>Login Page</h1>
                <form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="GET">
                    <label for="username">Enter Your Name</label>
                    <input type="text" name="username" id="username" />
                    <button type="submit">Login</button>
                </form>
            </main>`);
});

app.get("/", (req, res, next) => {
  fs.readFile("message.txt", "utf8", (err, data) => {
    if (err) {
      data = "data is not available";
    }

    res.send(`<main>
                <h1>Chat Page</h1>
                <form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST">
                    <input type="hidden" name="username" id="username" />
                    <label for="message">Enter Your Message</label>
                    <input type="text" name="message" id="message" />
                    <button type="submit">Send</button>
                </form>
                <p>${data}</p>
            </main>`);
  });
});

app.post("/", (req, res, next) => {
  fs.appendFile(
    "message.txt",
    `${req.body.username}</strong> - <i>${req.body.message}</i></br>`,
    (err) => {
      if (err) throw err;
     
      res.redirect("/");
    }
  );
});

app.listen(PORT, () => console.log(`Server is running in port no: ${PORT}`));
