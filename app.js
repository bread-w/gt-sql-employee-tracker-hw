var inquirer = require("inquirer");
var db = require("./db.js");
// require("console.table");

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
      switch (response.menu) {
        case "View all Employees":
          db.viewEmployees(showResults);
          break;
        case "View all Employees by Department":
          db.viewEmployeeDepartment(showResults);
          break;
        case "View all Employees by Manager":
          db.viewEmployeeManager(showResults);
          break;
        case "Add Employee":
          db.addEmployee(newEmployee);
          break;
        case "Remove Employee":
          db.removeEmployee();
          break;
        case "Update Employee Role":
          db.updateEmployeeRole();
          break;
        case "Update Employee Manager":
          db.updateEmployeeManager();
          break;
        default:
          process.exit();
      }
    });
}

function showResults(error, results) {
  // console.log(error);
  console.table(results);
  init();
}

function newEmployee(error, results) {
  // console.log(error);
  // console.table(results);
  init();
}
// connect to the mysql server and sql database
db.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});
