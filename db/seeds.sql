INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Engineering"),
       ("Information Technology"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES  ("Human Resource Manager", 80000, 01),
        ("Front Desk", 50000, 01),
        ("Software Engineer", 100000, 02),
        ("Engineer Manager", 130000, 02),
        ("Engineer Intern", 110000, 02),
        ("Lead Engineer", 120000, 02),
        ("Help Desk Support", 50000, 03),
        ("IT Manager", 90000, 03),
        ("Salesperson", 70000, 04),
        ("Sales Manager", 90000, 04);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, null), 
        ("James", "Pearl", 4, null),
        ("Sue", "Evans", 8, null),
        ("Mike", "Jackson", 10, null),
        ("Earl", "James", 5, 2),
        ("Jackie", "Chan", 9, 4), 
        ("Yuji", "Itadori", 7, 3), 
        ("Jade", "Song", 2, 1),
        ("Jimmy", "Yang", 3, 2); 

