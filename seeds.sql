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
VALUES ("Filipe", "Toledo", 1, null),
("Jack", "Robinson", 2, 1),
("Kanoa", "Igarashi", 3, null),
("Baron", "Mamiya", 4, 3),
("Tatiana", "Weston-Webb", 5, null),
("Johane", "Defay", 6, 5),
("Jake", "Marshall", 7, null),
("Miguel", "Pupo", 8, 4);
