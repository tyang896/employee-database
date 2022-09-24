INSERT INTO department (id, name)
VALUES (01, "Human Resources"),
       (02, "Engineering"),
       (03, "IT"),
       (04, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Human Resource Manager", 20.00,01),
        (002, "Front Desk Employee", 30.00,01),
        (003, "Accountant", 27.00, 04);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (0001, "John", "Doe", 003, null),
        (0002, "James", "Pearl", 001, null),
        (0003, "Amy", "Anderson", 002, 0002);       
