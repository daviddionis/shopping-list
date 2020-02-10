CREATE DATABASE shopping_list;

USE shopping_list;

---Users table
CREATE TABLE listas(
    ID INT(11) NOT NULL ,
    fullname VARCHAR(30) NOT NULL 
);

ALTER TABLE listas
    ADD PRIMARY KEY (id);

ALTER TABLE listas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE listas;
