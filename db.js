var mysql = require("mysql");
const inquirer = require("inquirer");
var connection;

function connect(callback) {
  // create the connection information for the sql database
  connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "8912",
    database: "employee_trackerDB",
  });
  connection.connect(callback);
}

function viewEmployees(callback) {
  connection.query("SELECT * FROM employee", function (error, results, fields) {
    // console.log(error);
    // console.log(results);
    // console.log(fields);
    callback(error, results);
  });
}

function viewEmployeeDepartment(callback) {
  connection.query("", function (error, results, fields) {
    // console.log(error);
    // console.log(results);
    // console.log(fields);
    callback(error, results);
  });
}

function addEmployee(callback) {
  connection.query("SELECT * FROM role", function (error, results, fields) {
    const departmentArray = results.map((entry) => entry.title);
    inquirer
      .prompt([
        {
          name: "f_Name",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "l_Name",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "jobTitle",
          type: "list",
          message: "What is the employee's job title?",
          choices: departmentArray,
        },
      ])
      .then((response) => {
        // console.log(response);
        let newEmployee = {};
        for (let i = 0; i < results.length; i++) {
          if (results[i].title === response.jobTitle) {
            newEmployee = results[i];
          }
        }
        const {f_Name, l_Name } = response;
        connection.query("INSERT INTO employee SET ?",
        {
          first_name: f_Name,
          last_name: l_Name,
          role_id: newEmployee.id,
        },
        )
      });
    callback(error, results);
  });
}

module.exports = {
  connect,
  viewEmployees,
  viewEmployeeDepartment,
  addEmployee,
};
