const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require ("console.table");
// const All = require("./lib/viewAllEmployees")

const choices = ["View All Departments", "View All Roles", "View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Role", "Add Department", "Add Employee", "Remove Employee", "Update Employee Role", "Quit"];
[allDepartments, allRoles, viewAll, byDepartment, byManager, addRole, addDepartment, addEmployee, removeEmployee, updateRole, quit] = choices;

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
    db.promise().query(`SELECT * FROM role`)
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
        console.log(`Added ${name} to the database`);
        init();
    })
    .catch(console.log);
}

const getDepartments = (deptList) => {
    deptList = []
    db.query(`SELECT department.name FROM department`, function (err, results) {
            results.forEach(department => deptList.push(department.name));
            return deptList;
            console.log(deptList);
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
            choices: deptList,//figure out how to determine what are the departments in the list
            when(choice){
                return choice.userOptions === addRole;
            }
        }
        //Add questions here
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
                        console.log("this nested switch statement works!");
                        viewByDepartments(02);
                        //Create code here
                        //init();
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
                break;
            case addDepartment:
                //addNewDepartment function goes here
                addNewDepartment(response.deptName);
                break;
            case addEmployee:
                //addNewEmployee function goes here
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


let deptList = []
const init = () => {
     
     //getDepartments(deptList);
    db.promise().query(`SELECT department.name FROM department`)
    .then(([answers]) => {
        deptList = [];
        answers.forEach(department => deptList.push(department.name));
        showQuestion();
    })
    .catch(console.log)
    // console.log(deptList);
}

init();