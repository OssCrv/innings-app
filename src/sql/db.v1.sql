DROP SCHEMA innings_app;

CREATE SCHEMA IF NOT EXISTS innings_app;

USE innings_app;

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR (50) NOT NULL,
    first_name VARCHAR (100),
    rol ENUM('ADMIN', 'USUARIO') NOT NULL DEFAULT 'USUARIO',
    pass VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS dependencies(
    id_dependency INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dependency_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS categories(
    id_category INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255),
    fk_dependency INT,
    FOREIGN KEY (fk_dependency) REFERENCES dependencies (id_dependency)
);

CREATE TABLE IF NOT EXISTS innings(
    id_inning INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    document VARCHAR(255) NOT NULL,
    inning INT NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT true,
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fk_dependency INT,
    fk_category INT,
    FOREIGN KEY (fk_dependency) REFERENCES dependencies (id_dependency),
    FOREIGN KEY (fk_category) REFERENCES categories (id_category)
);


INSERT INTO dependencies(dependency_name) VALUES ("Gimnasio");
INSERT INTO dependencies(dependency_name) VALUES ("Tesoreria");

INSERT INTO categories(category_name, fk_dependency) VALUES ("Procedimiento 1", 1);
INSERT INTO categories(category_name, fk_dependency) VALUES ("Procedimiento 2", 1);
INSERT INTO categories(category_name, fk_dependency) VALUES ("Procedimiento 2", 2);
INSERT INTO categories(category_name, fk_dependency) VALUES ("Procedimiento 1", 2);

INSERT INTO innings (document, fk_dependency, fk_category, inning, date_creation, active) 
            VALUES  (111, 2, 2, 1,'2022-02-14 10:17:07', false),
                    (222, 2, 2, 2,'2022-02-14 10:18:07', false),
                    (333, 2, 1, 1,'2022-02-15 16:18:07', false),
                    (444, 2, 1, 2,'2022-02-15 14:18:07', true),
                    (555, 2, 2, 1,'2022-02-15 12:18:07', true),
                    (666, 2, 1, 3,'2022-02-15 13:19:07', true),
                    (777, 2, 2, 2,'2022-02-15 10:18:07', true),
                    (888, 1, 1, 1,'2022-02-16 16:18:07', true),
                    (999, 1, 2, 1,'2022-02-16 14:18:07', true),
                    (101010, 1, 1, 2,'2022-02-16 12:18:07', true),
                    (111111, 1, 2, 2,'2022-02-16 13:19:07', true),
                    (121212, 1, 2, 3,'2022-02-16 11:16:07', true)
;

INSERT INTO users(user, first_name, pass, rol) VALUES ('Oss','Ossman', '$2a$08$LjwwQ5POn6Pu/evLnA4xeeLOGt5Ys1XmwjEEGwNgqH9OTP7rwd5f2', 'ADMIN');

SHOW TABLES;

DESCRIBE innings;
DESCRIBE categories;
DESCRIBE dependencies;
DESCRIBE users;


SELECT * FROM innings;
SELECT * FROM categories;
SELECT * FROM dependencies;
SELECT * FROM users;

SELECT * FROM innings WHERE DAY(date_creation)>=DAY(CURDATE()) AND ACTIVE AND fk_category = ${fk} ORDER BY inning DESC;
SELECT * FROM innings 
    JOIN categories ON categories.id_category = innings.fk_category
    JOIN dependencies ON categories.fk_dependency = dependencies.id_dependency
    WHERE DAY(date_creation)>=DAY(CURDATE()) AND ACTIVE AND fk_category = ${fk} ORDER BY inning DESC;


