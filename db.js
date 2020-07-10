var mysql = require("mysql");
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
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.name FROM employee RIGHT JOIN department ON employee.id = department.id ORDER BY employee.id;",
    function (error, results, fields) {
      // console.log(error);
      // console.log(results);
      // console.log(fields);
      callback(error, results);
    }
  );
}

module.exports = {
  connect,
  viewEmployees,
  viewEmployeeDepartment,
};
