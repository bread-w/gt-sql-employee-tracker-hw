var mysql = require("mysql");
var inquirer = require("inquirer");
var console.table = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "8912",
  database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

function init(){
     inquirer
  .prompt({
    name: "",
    type: "",
    message: "",
    choices: []
  })
//   .then(function(answer) {
//     // based on their answer, either call the bid or the post functions
//     if () {
//       postAuction();
//     }
//     else if() {
//       bidAuction();
//     } else{
//       connection.end();
//     }
//   });
}