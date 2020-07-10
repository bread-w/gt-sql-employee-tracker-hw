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
    function (error, results, fields) {
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
    function (error, results, fields) {
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
    function (error, results, fields) {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      callback(error, results);
    }
  );
}

function addEmployee(callback) {
  connection.query("SELECT * FROM role", function (error, results, fields) {
    if (error) throw error;
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
        function (error, results, fields) {
          if (error) throw error;
          callback(error, results);
        }
      );
    });
}

// function addRole(callback) {
//   connection.query("SELECT * FROM department", function (
//     error,
//     results,
//     fields
//   ) {
//     if (error) throw error;
//     const departmentArray = results.map((entry) => entry.name);
//     inquirer
//       .prompt([
//         {
//           name: "addRole",
//           type: "input",
//           message: "What role would you like to add?",
//         },
//         {
//           name: "newSalary",
//           type: "input",
//           message: "What is the salary of this new role?",
//         },
//         {
//           name: "departmentId",
//           type: "list",
//           message: "Which Department would you like to add this role into?",
//           choices: departmentArray,
//         },
//       ])
//       .then((response) => {
//         let newRole = {};
//         for (let i = 0; i < results.length; i++) {
//           if (results[i].name === response.departmentId) {
//             newRole = results[i];
//           }
//         }
//         const { addRole, newSalary } = response;
//         connection.query(
//           "INSERT INTO role SET ?",
//           {
//             title: addRole,
//             salary: newSalary,
//             department_id: newRole.id,
//           },
//           function (error) {
//             if (error) throw error;
//             callback(error, results);
//           }
//         );
//       });
//   });
// }

module.exports = {
  connect,
  viewEmployees,
  viewEmployeeDepartment,
  viewEmployeeManager,
  addEmployee,
  addDepartment,
  // addRole,
};
