var inquirer = require("inquirer");
var db = require("./db.js");

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
        "Add a Department",
        "Add a Role",
        "Update Employee Role",
        "Remove Employee",
        "Exit",
      ],
    })
    .then(function (response) {
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
        case "Add a Department":
          db.addDepartment(newDepartment);
          break;
        case "Add a Role":
          db.addRole(newRole);
          break;
        case "Update Employee Role":
          db.updateEmployeeRole(newRole);
          break;
        case "Remove Employee":
          db.removeEmployee(deleteEmployee);
          break;
        default:
          process.exit();
      }
    });
}

function showResults(error, results) {
  console.table(results);
  init();
}

function newEmployee(error, results) {

  init();
}

function newDepartment(error, results) {
  init();
}

function newRole(error, results) {
  init();
}

function deleteEmployee(error, results) {
  init();
}

// connect to the mysql server and sql database
db.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  init();
});
