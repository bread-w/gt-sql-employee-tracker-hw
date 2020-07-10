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
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (department_name)
VALUES ("Sales & Marketing"), ("Finance"), ("Operations"), ("Human Resources"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Marketing", 100.000, 1), ("Director of Finance", 100.000, 2), ("Director of Operations", 100.000, 3), ("HR Director", 100.000, 4), ("CTO", 100.000, 5), ("Sales Manager", 75.000, 1), ("Account Manager", 75.000, 2), ("General Manager", 75.000, 3), ("Benefits Manager", 75.000, 4), ("Senior Developer", 75.000, 5), ("Sales Representative", 50.000, 1), ("Account Representative", 50.000, 2), ("Assistant Manager", 50.000, 3), ("Benefits Liason", 50.000, 4), ("Junior Developer", 50.000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carol", "Danvers", 1, null), ("Tony", "Stark", 2, null), ("Steve", "Rogers", 3, null), ("Thor", "Odinson", 4, null), ("Bruce", "Banner", 5, null), ("Natasha", "Romanoff", 6, 1), ("Pepper", "Potts", 7, 2), ("Clint", "Barton", 8, 3), ("Mary Jane", "Watson", 9, 4), ("Peter", "Parker", 10, 5), ("Augustus", "Gloop", 11, 1), ("Violet", "Beauregarde", 12, 2), ("Veruca", "Salt", 13, 3), ("Mike", "Teavee", 14, 4), ("Charlie", "Bucket", 15, 5);

-- view employee, department and manager
SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, 
manager.first_name AS manager_first, manager.last_name AS manager_last 
FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id 
LEFT JOIN employee manager ON manager.id = employee.manager_id;

-- view employee by department, sorted by department
SELECT employee.id, employee.first_name, employee.last_name, department.department_name, role.salary, 
manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department.id 
LEFT JOIN employee manager ON manager.id = employee.manager_id 
ORDER BY department_id;

-- view employee by manager, ordered by manager
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, employee.manager_id, manager.first_name AS manager_first, manager.last_name AS manager_last FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id
ORDER BY employee.manager_id;