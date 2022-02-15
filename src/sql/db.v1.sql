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

INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 1, 1);
INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 1, 2);
INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 2, 1);
INSERT INTO innings(document, fk_dependency, fk_category) VALUES (1020475682, 2, 2);

INSERT INTO innings (document, fk_dependency, fk_category, inning, date_creation, active) 
            VALUES  (1020475682, 2, 2, 1,'2022-02-13 10:17:07', false),
                    (1220475682, 2, 2, 1,'2022-02-13 10:18:07', false),
                    (1030475682, 2, 1, 4,'2022-02-13 16:18:07', false),
                    (1024475682, 2, 1, 6,'2022-02-13 14:18:07', true),
                    (1020575682, 2, 2, 7,'2022-02-13 12:18:07', true),
                    (1020465682, 2, 1, 3,'2022-02-14 13:19:07', true),
                    (1220475683, 2, 2, 1,'2022-02-14 10:18:07', true),
                    (1030475612, 1, 1, 4,'2022-02-14 16:18:07', true),
                    (1024475582, 1, 2, 6,'2022-02-14 14:18:07', true),
                    (1020576682, 1, 1, 7,'2022-02-14 12:18:07', true),
                    (1020475682, 1, 2, 3,'2022-02-14 13:19:07', true),
                    (1020875782, 1, 2, 4,'2022-02-14 11:16:07', true)
;

SHOW TABLES;

DESCRIBE innings;
DESCRIBE categories;
DESCRIBE dependencies;

SELECT * FROM innings;
SELECT * FROM categories;
SELECT * FROM dependencies;

