DROP DATABASE shopping_list;

CREATE DATABASE shopping_list;

USE shopping_list;

CREATE TABLE listas(
    lista_id INT AUTO_INCREMENT PRIMARY KEY,
    name_lista VARCHAR(30) NOT NULL
);

CREATE TABLE productos(
    producto_id INT AUTO_INCREMENT PRIMARY KEY,
    name_producto VARCHAR(30) NOT NULL,
    lista_id INT,
    FOREIGN KEY (lista_id) REFERENCES listas(lista_id)
);


DESCRIBE listas;
