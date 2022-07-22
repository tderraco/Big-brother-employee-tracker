const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


//Connect to database
const dataBase = mysql.createConnection(
   {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "rootroot",
      database: "work_db"
   },
   console.log(`Connected to work_db database`)
);

dataBase.connect((err) => {
   if (err) throw err;
   console.log(`connected as id ${dataBase.threadId}`);
   startApp();

});

//app prompt
const startApp = () => {
   return inquirer.prompt([
      {
         type: 'rawlist',
         message: 'This is the Big Brother Employee tracker. Where do you want to snoop?',
         name: "welcomeMat",
         choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee']
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
            addADepartment()
            break;
         case 'Add a Role':
            addARole();
            break;
         case 'Add an Employee':
            addAnEmployee();
            break;
         case 'Update an Employee':
            viewUpdateAnEmployee();
            break;



      }
   })
}
//Lists departments
viewAllDepartments = () => {
   dataBase.query(`Select * FROM department ORDER BY id ASC;`, (err, res) => {
      if (err) throw err;
      console.table('\n', res, '\n');
      startApp();

   })
};
//view roles creates table from database
viewAllRoles = () => {
   dataBase.query(`SELECT role.id, role.title, role.salary, department.name
   FROM role
   JOIN department
   ON role.department_id = department.id
   ORDER BY role.id ASC;`, (err, res) => {
      if (err) throw err
      console.table('\n', res, '\n');
      startApp();

   })
};
//creates table with employee info and manager name
vieweAllEmployess = () => {
   dataBase.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name,
   CONCAT(manager.first_name, ' ', manager.last_name) managers_name
   FROM employee
   RIGHT JOIN employee manager
   ON employee.manager_id = manager.id
   JOIN role 
   ON employee.role_id = role.id
   JOIN department
   ON department.id = role.department_id
   ORDER BY employee.id ASC;`, (err, res) => {
      if (err) throw err
      console.table('\n', res, '\n');
      startApp();
   })
};
//add department prompt then responds by adding input to database
addADepartment = () => {
   inquirer.prompt([
      {
         type: 'input',
         message: 'Whats the department you would like to add?',
         name: 'newDepartment',

      }
   ]).then((response) => {
      dataBase.query(`INSERT INTO department SET ?`,
         {
           name: response.newDepartment,
         },
         (err, res) => {
            console.log(`\n ${response.newDepartment} has been added to the database. \n`);
            startApp();
         })
   })
};
//adds new role to database
addARole = () => {
   dataBase.query(`SELECT * from department;`, (err, res) => {
      if (err) throw err;
      let departments = res.map(department => ({ name: department.name, value: department.id }));
      console.log(departments)
      dataBase.query(`SELECT * FROM employee;`, (err, res) => {
         if (err) throw err;
         let employees = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
         inquirer.prompt([
            {
               type: 'input',
               message: 'What is the employees title?',
               name: 'title',
            },
            {
               type: 'input',
               message: 'What is the employees salary? ',
               name: 'salary',
           

            },
            {
               type: 'list',
               messaage: 'What department ?',
               name: 'department',
               choices: departments//['Sales', 'Engineering', 'Finance', 'Legal']
            },


         ]).then(res => {
            dataBase.query('Insert into role SET ?', {
               title: res.title, 
               salary: res.salary,
               department_id: res.department
            },(err,data) => {
               viewAllRoles()
            }) 
         })

      })

   })
};
//function adds new employee to database
addAnEmployee = () => {
   dataBase.query(`SELECT * from department;`, (err, res) => {
      if (err) throw err;
      let manager = res.map(manager => ({ name: manager.name, value: manager.id }));
      dataBase.query(`SELECT * FROM employee;`, (err, res) => {
         if (err) throw err;
         let employees = res.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
         inquirer.prompt([
            {
               type: 'input',
               message: 'What is the employees first name?',
               name: 'firstname'
            },
            {
               type: 'input',
               message: 'What is the employees last name?',
               name: 'lastname'
            },
            {
               type: 'input',
               message: 'What is the employees title?',
               name: 'title'
            },
            {
               type: 'raw list',
               messaage: 'Who is the manager ?',
               name: 'manager',
               choices: 'manager'
            }


         ]).then((res) => {
            dataBase.query(`INSERT INTO employee SET?`,
               {
                  first_name: res.firstname,
                  last_name: res.lastname,
                  role_id: res.title,
                  manager_id: res.manager

               },
               (err, res) => {
                  if (err) throw err
                  console.log(`\n ${res.firstname} ${res.lastname} has been added to the database. \n`);
                  startApp();
               })

         })
      })
   })


};
//function can update current employee role
viewUpdateAnEmployee = () => {
   dataBase.query(`SELECT * from role;`,
   (err, res) => {
      if (err) throw err;
      let roles = res.map(role => ({name: role.title, value: role.id }));
      dataBase.query(`SELECT * FROM employee where first_name is not null;`,
      (err, res) => {
         if (err) throw err;
         let employees = res.map(employee =>({
            name: employee.first_name + ' ' + 
            employee.last_name, value: employee.id }));
            console.log(employees)
            inquirer.prompt ([
               
                 {
                  type: 'list',
                  message: 'What is the employees new title?',
                  name: 'title',
                  choices: roles


                 },
                 
                 {
                  type: 'list',
                  message: 'Which employee is changing their title',
                  name: 'employee',
                  choices: employees
                 }

            ]).then((res) => {
               dataBase.query(`UPDATE employee SET role_id=? where id =?`,[res.title, res.employee],(err) => {
                  vieweAllEmployess()
               })
            })
      })
   })
}
