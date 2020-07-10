DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 4) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);

INSERT INTO department (department_name)
VALUES ("Sales & Marketing"), ("Finance"), ("Operations"), ("Human Resources"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Marketing", 100.000, 1), ("Director of Finance", 100.000, 2), ("Director of Operations", 100.000, 3), ("HR Director", 100.000, 4), ("CTO", 100.000, 5), ("Sales Manager", 75.000, 1), ("Account Manager", 75.000, 2), ("General Manager", 75.000, 3), ("Benefits Manager", 75.000, 4), ("Senior Developer", 75.000, 5), ("Sales Representative", 50.000, 1), ("Account Representative", 50.000, 2), ("Assistant Manager", 50.000, 3), ("Benefits Liason", 50.000, 4), ("Junior Developer", 50.000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Carol", "Danvers", 1), ("Tony", "Stark", 2), ("Steve", "Rogers", 3), ("Thor", "Odinson", 4), ("Bruce", "Banner", 5), ("Natasha", "Romanoff", 6), ("Pepper", "Potts", 7), ("Clint", "Barton", 8), ("Mary Jane", "Watson", 9), ("Peter", "Parker", 10), ("Augustus", "Gloop", 11), ("Violet", "Beauregarde", 12), ("Veruca", "Salt", 13), ("Mike", "Teavee", 14), ("Charlie", "Bucket", 15);

SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, manager.first_name
AS manager_last FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id
ORDER BY department_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, employee.manager_id, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id;

SELECT role.title, role.salary, role.department_id, department.department_name FROM role
LEFT JOIN department ON role.department_id = department.id;