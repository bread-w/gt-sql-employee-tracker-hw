var mysql = require("mysql");
var inquirer = require("inquirer");
var db = require("./db.js");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "8912",
  database: "employee_trackerDB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});

function init() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Exit",
      ],
    })
    .then(function (response) {
      // based on their answer, either call the bid or the post functions
      switch(response.menu){
        case "View all Employees":
          db.viewEmployees();
          break;
        case "View all Employees by Department":
          viewEmployeeDepartment();
          break;
        case "View all Employees by Manager":
          viewEmployeeManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
        default:
          process.exit();
      }
    });
}
