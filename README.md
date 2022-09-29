# Employee Management System


## Description
This is an application that manages employees in a database. Some of the functions it has includes: viewing employees, adding new employees, updating roles, adding new roles, and adding new departments. The purpose of this project was to learn how to use sql queries to modify a database on the server side. One of the most challenging parts of this project was figuring out how to write the sql queries to obtain the table information that I wanted. I was able to figure out in the end, however I am still learning how it all works. In the future, I would like to include other queries, such as updating managers, viewing employees by departments, by managers, and being able to remove employees.

## Table of Contents 

- [Employee Management System](#employee-management-system)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation
1. To install the application, move to your desired installation directory and run the following code in your terminal:

```
git clone git@github.com:tyang896/employee-management-system.git
```
2. To install program dependencies for this application, run the following command:
```
    npm i
```
## Usage
1. In order to run the application, users will first have to run mySQL using `mysql -u root -p` and enter their password
2. Once you've gain accessed to mysql, run the following lines of code to use the database:
   ```
   SOURCE db/schema.sql
   ```
3. After running the schema file, you can optionally run the seeds file from the repository using `SOURCE db/seeds.sql` or run your own commands to create values for your table. Once you've used mysql, use the `exit` command to quit mySQL.
4. In the `db/connection.js` file, change the `user` property to `root `, the `database` to `employee_db`, and the password to your mySQL password.
5. Run the following code in the terminal to start the application: 
```
node index.js
```
You can view a demonstration of the application here in this [video](https://drive.google.com/file/d/1Q37VHeEiNziQKwemZbxGVGFb5t_QUuGh/view)
