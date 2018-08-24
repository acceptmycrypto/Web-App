DROP DATABASE IF EXISTS crypto_db;
CREATE DATABASE crypto_db;

USE crypto_db;

CREATE TABLE crypto(
	id INT NOT NULL AUTO_INCREMENT,
	currency_name TEXT NOT NULL,
	currency_symbol BLOB NOT NULL,
	currency_price INT NOT NULL, 
	currency_link VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);