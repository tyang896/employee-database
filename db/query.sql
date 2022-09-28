-- SELECT employee.id,
-- employee.first_name,
-- employee.last_name,
-- role.title
-- FROM employee, role
-- WHERE employee.role_id = role.id
-- AND role.department_id = 03;





-- SELECT department.name, role.title
-- FROM role
-- JOIN department ON role.department_id = department.id

-- SELECT department.name, department.department_id
-- FROM department
-- GROUP BY department.name

-- SELECT role.id, role.title, department.id AS department, role.salary
-- FROM role
-- INNER JOIN department ON role.department_id = department.id;


-- INSERT INTO role (title, salary, department_id) 
-- VALUES ("${name}", ${salary}, ${department});

-- SELECT department.name, department.id FROM department;


-- SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE employee.manager_id IS null;


-- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ("John", "Doe", 1, null)


-- UPDATE employee SET role_id = 0 WHERE first_name = "Steven"



-- SELECT a.id, a.first_name, a.last_name,
-- b.manager_id AS "MANAGER_ID", b.first_name AS "MANAGER_NAME"
-- FROM employee a 
-- LEFT JOIN employee b ON a.manager_id = b.id;


-- SELECT employee.id, 
-- employee.first_name, 
-- employee.last_name,
-- role.title,
-- department.name AS 'department',
-- role.salary,
-- employee.manager_id AS 'manager'
-- FROM employee
-- INNER JOIN role ON role.id = employee.role_id 
-- INNER JOIN department ON department.id = role.department_id;


-- SELECT employee.id, 
-- employee.first_name, 
-- employee.last_name,
-- role.title,
-- department.name AS 'department',
-- role.salary,
-- employee.manager_id AS 'manager'
-- FROM employee, role, department
-- WHERE department.id = role.department_id
-- AND role.id = employee.role_id;


-- SELECT a.id, a.first_name, a.last_name,
-- b.manager_id AS "MANAGER_ID", b.first_name AS "MANAGER_NAME"
-- FROM employee a 
-- LEFT JOIN employee b ON a.manager_id = b.id;

SELECT employeeA.id, 
employeeA.first_name, 
employeeA.last_name,
role.title,
department.name AS 'department',
role.salary,
concat(employeeB.first_name, " ",  employeeB.last_name) AS 'manager'
FROM employee employeeA
INNER JOIN role ON role.id = employeeA.role_id 
INNER JOIN department ON department.id = role.department_id
LEFT JOIN employee employeeB ON employeeA.manager_id = employeeB.id;