DROP DATABASE shopping_list;

CREATE DATABASE shopping_list;

USE shopping_list;

CREATE TABLE listas(
    lista_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE productos(
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    lista_id INT,
    FOREIGN KEY (lista_id) REFERENCES listas(lista_id)
);

DESCRIBE listas;

INSERT INTO listas (name) VALUES ('Mercadona');
INSERT INTO productos (name, lista_id) VALUES ('Cacao',1);

SELECT * FROM  productos JOIN listas;