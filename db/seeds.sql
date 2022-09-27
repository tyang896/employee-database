INSERT INTO department (id, name)
VALUES (01, "Human Resources"),
       (02, "Engineering"),
       (03, "Information Technology"),
       (04, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Human Resource Manager", 80000,01),
        (002, "Front Desk", 50000,01),
        (003, "Accountant", 85000, 04);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 003, null),
        ("James", "Pearl", 001, null),
        ("Amy", "Anderson", 002, 0002);       
