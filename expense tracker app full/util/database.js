// const mysql=require('mysql2');

// // create the connection to database
// // using MySQL driver.

// const pool =mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node_complete',
//     password:'deepakkr4'
// });
// module.exports=pool.promise();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("project", "root", "deepakkr4", {
  dialect: "mysql",
  host: "localhost",
});
module.exports=sequelize;