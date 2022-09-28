-- SELECT employee.id,
-- employee.first_name,
-- employee.last_name,
-- role.title
-- FROM employee, role
-- WHERE employee.role_id = role.id
-- AND role.department_id = 03;


-- SELECT employee.id, 
-- employee.first_name, 
-- employee.last_name,
-- role.title,
-- department.name AS 'department',
-- role.salary,
-- employee.manager_id AS 'manager'
-- FROM employee, role, department
-- WHERE department.id = role.department_id, employee.id = employee.manager_id
-- AND role.id = employee.role_id 


SELECT *
FROM department;