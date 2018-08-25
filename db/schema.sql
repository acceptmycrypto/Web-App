DROP DATABASE IF EXISTS crypto_db;
CREATE DATABASE crypto_db;

USE crypto_db;

CREATE TABLE crypto_metadata(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_name VARCHAR(255) NOT NULL,
	crypto_symbol VARCHAR(255) NOT NULL,
	crypto_price DECIMAL(10, 4) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE crypto_info(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_metadata_id INT NULL,
	crypto_logo VARCHAR(255) NOT NULL,
	crypto_link VARCHAR(255) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (crypto_metadata_id) REFERENCES crypto_metadata(id)
);

-- CREATE TABLE business (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	business_name VARCHAR(255) NOT NULL,
-- 	business_discription TEXT NOT NULL,
-- 	business_link VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY (id),
--   FOREIGN KEY business(id) REFERENCES crypto(id)
-- );

-- CREATE TABLE userInput (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	user_email VARCHAR(255) NOT NULL,
-- 	cryptoCurrency VARCHAR(255) NOT NULL,
-- 	merchant VARCHAR(255) NOT NULL,
-- 	PRIMARY KEY (id)
-- );
