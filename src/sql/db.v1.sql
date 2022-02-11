DROP SCHEMA innings_app;

CREATE SCHEMA IF NOT EXISTS innings_app;

USE innings_app;

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
    document INT NOT NULL,
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

INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 1, 1);
INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 1, 2);
INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 2, 1);
INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 2, 2);

SHOW TABLES;

DESCRIBE innings;
DESCRIBE categories;
DESCRIBE dependencies;

SELECT * FROM innings;
SELECT * FROM categories;
SELECT * FROM dependencies;

SELECT id_category, category_name, dependency_name, id_dependency 
FROM categories
    JOIN dependencies
    ON categories.fk_dependency = dependencies.id_dependency;
