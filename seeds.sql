INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2 ),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Filipe", "Toledo", "Sales Lead", null),
("Jack", "Robinson", "Salesperson", 1),
("Kanoa", "Igarashi", "Lead Engineer", null),
("Baron", "Mamiya", "Software Engineer", 2),
("Tatiana", "Weston-Webb", "Account Manager", null),
("Johane", "Defay", "Accountant", 3),
("Jake", "Marshall", "Legal Team Lead", null),
("Miguel", "Pupo", "Lawyer", 4);
