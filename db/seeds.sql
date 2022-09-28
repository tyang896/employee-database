INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Engineering"),
       ("Information Technology"),
       ("Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Human Resource Manager", 80000, 01),
        (002, "Front Desk", 50000, 01),
        (004, "Salesperson", 70000, 04),
        (005, "Sales Manager", 90000, 04),
        (007, "Software Engineer", 100000, 02),
        (008, "Engineer Manager", 130000, 02),
        (009, "Engineer Intern", 110000, 02),
        (010, "Lead Engineer", 120000, 02),
        (011, "Help Desk Support", 50000, 03),
        (012, "IT Manager", 90000, 03);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 001, null), 
        ("James", "Pearl", 005, null),
        ("Sue", "Evans", 008, null),
        ("Mike", "Jackson", 012, null),
        ("Earl", "James", 004, 0002 ),
        ("Jackie", "Chan", 010, 0004), 
        ("Yuji", "Itadori", 009, 0004), 
        ("Jade", "Song", 002, 0001),
        ("Jimmy", "Yang", 011, 0005); 

