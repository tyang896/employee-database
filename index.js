const inquirer = require("inquirer");
const db = require("./db/connection.js");
const cTable = require ("console.table");
// const All = require("./lib/viewAllEmployees")
console.log(typeof(db))
const choices = ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Quit"];
[viewAll, byDepartment, byManager, addEmployee, removeEmployee, updateRole, quit] = choices;

const viewAllEmployees = () => {
    const sqlQuery =    `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name,
                        role.title,
                        department.name AS 'department',
                        role.salary,
                        employee.manager_id AS 'manager'
                        FROM employee, role, department
                        WHERE department.id = role.department_id, employee.id = employee.manager_id
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

const init = () => {
    const showQuestion = () => {
        inquirer.prompt([
            {
                type: "list",
                name: "userOptions",
                message: "What would you like to do?",
                choices: [viewAll, byDepartment, byManager, addEmployee, removeEmployee, updateRole, quit]
            },
            {
                type: "list",
                name: "departmentType",
                message: "Which department would you like to see employees for?",
                choices: ["Engineering", "Finance", "Human Resources", "Information Technology"],
                when(choice){
                    return choice.userOptions === byDepartment;
                }
            }
            //Add questions here
        ]).then((response) => {
            switch(response.userOptions){
                case quit:
                    process.exit();
                case viewAll:
                    viewAllEmployees();
                    break;
                case byDepartment:
                    switch(response.departmentType){
                        case "Engineering":
                            console.log("this nested switch statement works!");
                            db.query()
                            //Create code here
                            //init();
                            break;
                        case "Finance":
                            //Show Finance departmener here
                            break;
                        case "Human Resources":
                            //code for human resources here
                            break;
                        case "Information Technology":
                            //code for IT here
                            break;
                    }
                    break;
                case byManager:
            }
        })
        
    }//end of showQuestion function
    showQuestion();
    
}

init();