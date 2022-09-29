const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require ("console.table");

//Choices for inquirer prompts
const choices = ["View All Departments", "View All Roles", "View All Employees", "Add Role", "Add Department", "Add Employee",  "Update Employee Role", "Quit"];
[allDepartments, allRoles, viewAll, addRole, addDepartment, addEmployee, updateRole, quit] = choices;

//Lists for retrieving data from employee_db database
let deptList = [];
let roles = [];
let managersList = [];
let employeesList = [];

//Show a table of all departments
const viewAllDepartments = () => {
    //Retrieves the department id, and department name
    db.promise().query(`SELECT * FROM department`)
    .then(([results]) => {
        console.log();
        console.table(results); 
        init();
    })
    .catch(console.log);
}

//Show a table of all roles
const viewAllRoles = () => {
    //Combine columns from the role, and department table
    db.promise().query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id;`)
    .then(([results]) => {
        console.log();
        console.table(results); 
        init();
    })
    .catch(console.log);
}

//Show a table of all employees
const viewAllEmployees = () => {
    //Query combines columns from employee, role, and department table
    const sqlQuery =    `SELECT employeeA.id, 
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
    `
    db.promise().query(sqlQuery)
        .then(([results]) => {
            console.log();
            console.table(results); 
            init();
        })
        .catch(console.log);
}

//Add department to database
const addNewDepartment = (name) => {
    //Add new name to the 'name' column inside the department table
    db.promise().query(`INSERT INTO department (name) VALUES ("${name}");`)
    .then(() => {
        console.log(`\nAdded ${name} to the database\n`);
        init();
    })
    .catch(console.log);
}

//Add role to database
const addNewRole = (name, salary, department) => {
    let departmentId;
    //Retrieve name and id from the department table
    db.promise().query(`SELECT department.name, department.id FROM department;`)
    .then(([answers]) => {
        answers.forEach(object => {
            if(object.name === department){
                departmentId = object.id;
            }
        })
        //Add new role to the role table
        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${name}", ${salary}, ${departmentId});`)
        .then(() => {
            console.log(`\nAdded ${name} to the database\n`);
            init();
        })
        .catch(console.log);
    })

}

//Add new employee to database
const addNewEmployee = (firstName, lastName, roleTitle, employeeManager) => {
    let roleId;
    let managerId = "null";
    //Retrieve title, and id from the role table inside the employee_db database
    db.promise().query(`SELECT role.title, role.id FROM role;`)
    .then(([answers]) => {
        //answers = [{title: Front Desk, id: 2}, {title: Software Engineer, id: 3}...]
        answers.forEach(object => {
            if(object.title === roleTitle){
                roleId = object.id;
            }
        })
        //Retrieve managers from the database 
        db.promise().query(`SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE employee.manager_id IS null;`)
        .then(([answers]) => {
            //answers = [{first_name: John, last_name: Doe, id: 1}]
            answers.forEach(object => {
                if(`${object.first_name} ${object.last_name}` === employeeManager){
                    managerId = object.id;
                }
            })
            //Add new employee to the employee table from the employee_db database
            db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ("${firstName}", "${lastName}", ${roleId}, ${managerId})`)
            .then(() => {
                console.log(`\nAdded ${firstName} ${lastName} to the database\n`);
                init();
            })
            
        })
    })
}

//Update current employee role
const updateEmployeeRole = (name, role) => {
    let roleId;
    const fullName = name.split(" ");
    const firstName = fullName[0];
    //Retrieve role title, and role Id from database
    db.promise().query(`SELECT role.title, role.id FROM role;`)
    .then(([answers]) => {
        //answers = [{title: Front Desk, id: 2}, {title: Software Engineer, id: 3}...]
        answers.forEach(object => {
            if(object.title === role){
                roleId = object.id;
            }
        })
        //Update emloyee role
        db.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE first_name = "${firstName}"`)
        .then(() => {
            console.log(`\nUpdated employee's role\n`);
            init();
        })
    })
}

//Prompts user for questioms
const showQuestion = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "userOptions",
            message: "What would you like to do?",
            choices: [allDepartments, allRoles, viewAll, addDepartment, addRole, addEmployee, updateRole, quit]
        },
        {//---------------------ADD DEPARTMENT SECTION-------------------------
            type: "input",
            name: "deptName",
            message: "What is the name of the department?",
            when(choice){
                return choice.userOptions === addDepartment;
            }
        },
        {//---------------------ADD ROLE SECTION-------------------------------
            type: "input",
            name: "roleName",
            message: "What is the name of the role?",
            when(choice){
                return choice.userOptions === addRole;
            }
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role?",
            when(choice){
                return choice.userOptions === addRole;
            }
        },
        {
            type: "list",
            name: "roleDept",
            message: "Which department does the role belong to?",
            choices: deptList,
            when(choice){
                return choice.userOptions === addRole;
            }
        },
        {//---------------------ADD EMPLOYEE SECTION----------------------------
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
            when(choice){
                return choice.userOptions === addEmployee;
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
            when(choice){
                return choice.userOptions === addEmployee;
            }
        },
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: roles,
            when(choice){
                return choice.userOptions === addEmployee;
            }
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?",
            choices: managersList, 
            when(choice){
                return choice.userOptions === addEmployee;
            }
        },
        {//-------------------------UPDATE ROLE SECTION-------------------------
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employeesList,
            when(choice){
                return choice.userOptions === updateRole;
            }

        },
        {
            type: "list",
            name: "assignRole",
            message: "Which role do you want to assign the selected employee?",
            choices: roles,
            when(choice){
                return choice.userOptions === updateRole
            }
        }
        
    ]).then((response) => {
        //Runs a specific function based off of user response
        switch(response.userOptions){
            case quit:
                process.exit();
            case allDepartments:
                viewAllDepartments();
                break;
            case allRoles:
                viewAllRoles();
                break;
            case viewAll:
                viewAllEmployees();
                break;
            case addDepartment:
                addNewDepartment(response.deptName);
                break;
            case addRole:
                const {roleName, roleSalary, roleDept} = response;
                addNewRole(roleName, roleSalary, roleDept);
                break;
            case addEmployee:
                const {firstName, lastName, employeeRole, employeeManager} = response;
                addNewEmployee(firstName, lastName, employeeRole,  employeeManager);
                break;
            case updateRole:
                const {employee, assignRole} = response;
                //employee = "John Doe"
                //assignRole = "Engineer"
                updateEmployeeRole(employee, assignRole);
                break;
        }
    })
    
}//end of showQuestion function


//This function initializes during start of application
const init = () => {
    db.promise().query(`SELECT department.name FROM department;`)
    .then(([answers]) => {
        deptList = [];
        roles = [];
        employeesList = [];
        managersList = [`None`];
        answers.forEach(department => deptList.push(department.name));
        db.promise().query(`SELECT role.title FROM role`)
        .then(([answers])=>{
            //answers = [{title: Engineer}, {title: Mechanical Engineer}, ....]
            answers.forEach(role => roles.push(role.title))
            db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee WHERE employee.manager_id IS null;`)//add query here
            .then(([answers]) => {
                //answers = [{first_name: John, last_name: Doe}, ]
                answers.forEach(manager => {
                    const name = `${manager.first_name} ${manager.last_name}`;
                    managersList.push(name);
                })
                db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee`)
                .then(([answers]) => {
                    //answers = [{first_name: John, last_name: Doe}, {first_name: becky, last_name: Johnson}, ....]
                    answers.forEach(object => {
                        const name = `${object.first_name} ${object.last_name}`;
                        employeesList.push(name);
                    })
                    showQuestion();
                })
            })
        }) 
    })
    .catch(console.log)
}

init();