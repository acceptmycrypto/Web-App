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

CREATE TABLE business (
	id INT NOT NULL AUTO_INCREMENT,
	business_name VARCHAR(255) NOT NULL,
	business_discription TEXT NOT NULL, 
	business_link VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY business(id) REFERENCES crypto(id)
);

CREATE TABLE userInput (
	id INT NOT NULL AUTO_INCREMENT,
	user_email TEXT NOT NULL,
	cryptoCurrency VARCHAR(255) NOT NULL, 
	merchant VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
