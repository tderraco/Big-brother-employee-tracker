const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');

//Connect to database
const dataBase = mysql.createConnection(
   {
      host: "localhost",
      port: 3001,
      user: "root",
      password: "rootroot",
      database: work_db
   },
   console.log(`Connected to work_db database`)
);

dataBase.connect((err) => {
   if (err) throw err;
   console.log(`connected as id ${dataBase.threadId}`);
   startApp();

});


const startApp = () => {
   return inquirer.prompt([
      {
         type: 'rawlist',
         message: 'This is the Big Brother Employee tracker. Where do you want to snoop?',
         name: welcomeMat,
         choices: ['View All Departments', 'View All Roles', 'View All Employess', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee']
      }
   ]).then((response) => {
      switch (response.welcomeMat) {
         case 'View All Departments':
            viewAllDepartments();
            break;
         case 'View All Roles':
            viewAllRoles();
            break;
         case 'View All Employees':
            vieweAllEmployess();
            break;
         case 'Add a Department':
            viewAddADepartment();
            break;
         case 'Add a Role':
            viewAddARole();
            break;
         case 'Add an Employee':
            viewAddAnEmployee();
            break;
         case 'Update an Employee':
            viewUpdateAnEmployee();
            break;



      }
   })
}
viewAllDepartments = () => {
   dataBase.query(`Select * FROM department ORDER BY department_id ASC;`,(err, res) => {
      if (err) throw err;
      console.table('\n', res, '\n');
      startApp();

   })
}; 
viewAllRoles = () => {
   dataBase.query(`SELECT role.role_id, role.title, role.salary, department.department_name, department.department_id
   FROM role
   JOIN department
   ON role.department_id = department.department_id
   ORDER BY role.role_id ASC;`, (err, res) => {
      if (err) throw err
      console.table('\n', res, '\n');
      startApp();

   })
};
vieweAllEmployess = () => {
   dataBase.query(`SELECT employee.employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, department.department_id
   CONCAT(manager.first_name, ' ', manager.last_name) manager
   FROM employee
   RIGHT JOIN employee
   ON employee.manager_id = manager.employee_id
   JOIN role 
   ON employee.role_id = role.role_id
   JOIN department
   ON department.department_id = role.department_id
   ORDER BY employee.employee_id ASC;`, (err, res) => {
      if (err) throw err
      console.table('\n', res, '\n');
      startApp();
   })
};