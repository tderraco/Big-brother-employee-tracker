const inquirer = require('inquirer');
const mysql = require ('mysql2');
const { userInfo } = require('os');
const PORT = process.env.PORT || 3001;

//Connect to database
const db = mysql.createConnection (
   { 
    host: "localhost",
    port: 3001,
    user: "root",
    password: "rootroot",
    database: work_db
   },
   console.log(`Connected to work_db database`)
   );

