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
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
    function (error, results) {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      callback(error, results);
    }
  );
}

function viewEmployeeDepartment(callback) {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY department_id;",
    function (error, results) {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      callback(error, results);
    }
  );
}

function viewEmployeeManager(callback) {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, employee.manager_id, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.manager_id;",
    function (error, results) {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      callback(error, results);
    }
  );
}

function addEmployee(callback) {
  connection.query("SELECT * FROM role", function (error, results) {
    if (error) throw error;
    const departmentArray = results.map((data) => data.title);
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
        const { f_Name, l_Name } = response;
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: f_Name,
            last_name: l_Name,
            role_id: newEmployee.id,
          },
          function (error) {
            if (error) throw error;
            callback(error, results);
          }
        );
      });
  });
}

function addDepartment(callback) {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      const { newDepartment } = response;
      connection.query(
        "INSERT INTO department SET ?",
        { department_name: newDepartment },
        function (error, results) {
          if (error) throw error;
          console.table(response);
          callback(error, results);
        }
      );
    });
}

function addRole(callback) {
  connection.query("SELECT * FROM role", function (error, results) {
    if (error) throw error;
    const departmentArray = results.map((data) => data.department_id);
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this new role?",
        },
        {
          name: "department_id",
          type: "list",
          message: "Which department would you like to add this role into?",
          choices: departmentArray,
        },
      ])
      .then((results) => {
        console.log(results);
        connection.query("INSERT INTO role SET ?", results, (err) => {
          if (err) throw err;
          connection.query("SELECT * FROM role", (err, res) => {
            if (err) throw err;
            console.table(res);
            callback(error, results);
          });
        });
      });
  });
}

function updateEmployeeRole(callback) {
  connection.query("SELECT * FROM role", (error, results) => {
    if (error) throw error;
    connection.query("SELECT * FROM employee", (error, response) => {
      if (error) throw error;
      inquirer
        .prompt([
          {
            name: "role_id",
            type: "list",
            message: "What is this employee's new role?",
            choices: function () {
              var roleArray = [];
              for (var i = 0; i < results.length; i++) {
                const roleToUpdate = {
                  name: `${results[i].title}`,
                  value: results[i].id,
                };
                roleArray.push(roleToUpdate);
              }
              return roleArray;
            },
          },
          {
            type: "list",
            name: "id",
            message: "Which employee would you like to update?",
            choices: function () {
              var employeeArray = [];
              for (var i = 0; i < response.length; i++) {
                const employeeToUpdate = {
                  name: `${response[i].first_name} ${response[i].last_name}`,
                  value: response[i].id,
                };
                employeeArray.push(employeeToUpdate);
              }
              return employeeArray;
            },
          },
        ])
        .then((response) => {
          console.log(response);
          connection.query(
            "UPDATE employee SET ? WHERE ?;",
            [
              {
                role_id: response.role_id,
              },
              {
                id: response.id,
              },
            ],
            (error) => {
              if (error) throw error;
              connection.query(
                `SELECT employee.first_name, employee.last_name, role.title From 
          employee LEFT Join role ON employee.role_id = role.id;`,
                (error, res) => {
                  if (error) throw error;
                  console.table(res);
                  callback(error, results);
                }
              );
            }
          );
        });
    });
  });
}

function removeEmployee(callback) {
  connection.query("SELECT * FROM employee", function (error, results) {
    if (error) throw error;
    inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "Which employee would you like to delete?",
        choices: function () {
          var employeeArray = [];
          for (var i = 0; i < results.length; i++) {
            const Obj = {
              name: `${results[i].first_name} ${results[i].last_name}`,
              value: results[i].id,
            };
            employeeArray.push(Obj);
          }
          return employeeArray;
        },
      })
      .then(function ({ id }) {
        const query = "DELETE FROM employee WHERE id = ?";
        connection.query(query, id, function (error, results) {
          if (error) throw error;
          connection.query("SELECT * FROM employee", (error, res) => {
            if (error) throw error;
            console.log("Your delete was successful");
            console.table(res);
            callback(error, results);
          });
        });
      });
  });
}

module.exports = {
  connect,
  viewEmployees,
  viewEmployeeDepartment,
  viewEmployeeManager,
  addEmployee,
  addDepartment,
  addRole,
  updateEmployeeRole,
  removeEmployee,
};
