const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require ("console.table");
// const All = require("./lib/viewAllEmployees")

const choices = ["View All Departments", "View All Roles", "View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Role", "Add Department", "Add Employee", "Remove Employee", "Update Employee Role", "Quit"];
[allDepartments, allRoles, viewAll, byDepartment, byManager, addRole, addDepartment, addEmployee, removeEmployee, updateRole, quit] = choices;
let deptList = [];
let roles = [];
let managersList = [];

const viewAllDepartments = () => {
    db.promise().query(`SELECT * FROM department`)
    .then(([results]) => {
        console.log();
        console.table(results); 
        init();
    })
    .catch(console.log);
}

viewAllRoles = () => {
    db.promise().query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id;`)
    .then(([results]) => {
        console.log();
        console.table(results); 
        init();
    })
    .catch(console.log);
}

const viewAllEmployees = () => {
    const sqlQuery =    `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name,
                        role.title,
                        department.name AS 'department',
                        role.salary,
                        employee.manager_id AS 'manager'
                        FROM employee, role, department
                        WHERE department.id = role.department_id
                        AND role.id = employee.role_id                   
    `
    db.promise().query(sqlQuery)
        .then(([results]) => {
            console.log();
            console.table(results); 
            init();
        })
        .catch(console.log);
}

//Takes in the department id from the seeds.sql file
const viewByDepartments = (departmentId) => {
    const deptId = departmentId;
    const sqlQuery =    `SELECT employee.id,
                        employee.first_name,
                        employee.last_name,
                        role.title
                        FROM employee, role
                        WHERE employee.role_id = role.id  
                        AND role.department_id = ${deptId}    
    `
    db.promise().query(sqlQuery)
    .then(([results]) => {
        console.log();
        console.table(results); 
        init();
    })
    .catch(console.log);
}


const addNewDepartment = (name) => {
    db.promise().query(`INSERT INTO department (name) VALUES ("${name}");`)
    .then(() => {
        console.log(`\nAdded ${name} to the database\n`);
        init();
    })
    .catch(console.log);
}

// const getDepartments = (deptList) => {
//     deptList = []
//     db.query(`SELECT department.name FROM department`, function (err, results) {
//             results.forEach(department => deptList.push(department.name));
//             return deptList;
//             console.log(deptList);
//     })
// }

const addNewRole = (name, salary, department) => {
    let departmentId;
    //TODO: figure out how to convert the deparment name into the department id
    db.promise().query(`SELECT department.name, department.id FROM department;`)
    .then(([answers]) => {
        answers.forEach(object => {
            if(object.name === department){
                departmentId = object.id;
            }
        })
        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${name}", ${salary}, ${departmentId});`)
        .then(() => {
            console.log(`\nAdded ${name} to the database\n`);
            init();
        })
        .catch(console.log);
    })

}

const addNewEmployee = (firstName, lastName, roleTitle, employeeManager) => {
    let roleId;
    let managerId = "null";
    db.promise().query(`SELECT role.title, role.id FROM role;`)
    .then(([answers]) => {
        //answers = [{title: Front Desk, id: 2}, {title: Software Engineer, id: 3}...]
        answers.forEach(object => {
            if(object.title === roleTitle){
                roleId = object.id;
            }
        })
        db.promise().query(`SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE employee.manager_id IS null;`)
        .then(([answers]) => {
            //answers = [{first_name: John, last_name: Doe, id: 1}]
            answers.forEach(object => {
                if(`${object.first_name} ${object.last_name}` === employeeManager){
                    managerId = object.id;
                }
            })
            db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ("${firstName}", "${lastName}", ${roleId}, ${managerId})`)
            .then(() => {
                console.log(`\nAdded ${firstName} ${lastName} to the database\n`);
                init();
            })
            
        })
    })
        
}


const showQuestion = () => {
    //console.log(deptList);
    inquirer.prompt([
        {
            type: "list",
            name: "userOptions",
            message: "What would you like to do?",
            choices: [allDepartments, allRoles, viewAll, byDepartment, byManager, addRole, addDepartment, addEmployee, removeEmployee, updateRole, quit]
        },
        {
            type: "list",
            name: "departmentType",
            message: "Which department would you like to see employees for?",
            choices: deptList,
            when(choice){
                return choice.userOptions === byDepartment;
            }
        },
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the department?",
            when(choice){
                return choice.userOptions === addDepartment;
            }
        },
        {
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
        {
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
            choices: roles,//TODO: Make a list of all the roles
            when(choice){
                return choice.userOptions === addEmployee;
            }
        },
        {
            type: "list",
            name: "employeeManager",
            message: "Who is the employee's manager?",
            choices: managersList, //TODO: Make a list of all the managers
            when(choice){
                return choice.userOptions === addEmployee;
            }
        }
        
    ]).then((response) => {
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
            case byDepartment:
                switch(response.departmentType){
                    case "Engineering":
                        viewByDepartments(02);
                        break;
                    case "Finance":
                        //Show Finance departmener here
                        viewByDepartments(04);
                        break;
                    case "Human Resources":
                        //code for human resources here
                        viewByDepartments(01);
                        break;
                    case "Information Technology":
                        viewByDepartments(03);
                        //code for IT here
                        break;
                }
                break;
            case byManager:
                //add function here
                break;
            case addRole:
                //addNewRole function here
                const {roleName, roleSalary, roleDept} = response;
                addNewRole(roleName, roleSalary, roleDept);
                break;
            case addDepartment:
                //addNewDepartment function goes here
                addNewDepartment(response.deptName);
                break;
            case addEmployee:
                //addNewEmployee function goes here
                const {firstName, lastName, employeeRole, employeeManager} = response;
                addNewEmployee(firstName, lastName, employeeRole,  employeeManager);
                break;
            case removeEmployee:
                //remove function goes here
                break;
            case updateRole:
                //updateEmployeeRole function goes here
                break;
        }
    })
    
}//end of showQuestion function



const init = () => {
     //getDepartments(deptList);
    db.promise().query(`SELECT department.name FROM department;`)
    .then(([answers]) => {
        //console.log(answers);
        deptList = [];
        roles = [];
        managersList = [`None`];
        answers.forEach(department => deptList.push(department.name));
        db.promise().query(`SELECT role.title FROM role`)//TODO: Gain access to all the roles
        .then(([answers])=>{
            //answers = [{title: Engineer}, {title: Mechanical Engineer}, ....]
            answers.forEach(role => roles.push(role.title))
            db.promise().query(`SELECT employee.first_name, employee.last_name FROM employee WHERE employee.manager_id IS null;`)//add query here
            .then(([answers]) => {
                //answers = [{first_name: John, last_name: Doe}, ]
                //add manager list here
                answers.forEach(manager => {
                    const name = `${manager.first_name} ${manager.last_name}`;
                    managersList.push(name);
                    //console.log(managersList)
                })
                //console.log(managersList)
                showQuestion();
            })
            
        })
        
    })
    .catch(console.log)

    // console.log(deptList);
}

init();