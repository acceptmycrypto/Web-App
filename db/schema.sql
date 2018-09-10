DROP DATABASE IF EXISTS crypto_db;
CREATE DATABASE crypto_db;

USE crypto_db;

CREATE TABLE crypto_metadata(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_name VARCHAR(255) NOT NULL UNIQUE,
	crypto_symbol VARCHAR(255) NOT NULL UNIQUE,
	crypto_price DECIMAL(10, 4) NOT NULL,
	venues_count INT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE crypto_info(
	id INT NOT NULL AUTO_INCREMENT,
	crypto_metadata_name VARCHAR(255) NULL UNIQUE,
	crypto_logo VARCHAR(255) NOT NULL UNIQUE,
	crypto_link VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id),
	FOREIGN KEY (crypto_metadata_name) REFERENCES crypto_metadata(crypto_name)
);

CREATE TABLE venues (
	id INT NOT NULL AUTO_INCREMENT,
	venue_name VARCHAR(255) NOT NULL,
	venue_description VARCHAR(255) NOT NULL,
	venue_link VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

-- create a junction table for many-to-many association
CREATE TABLE cryptos_venues (
	crypto_id INT NOT NULL,
	venue_id INT NOT NULL,
	PRIMARY KEY (crypto_id, venue_id),
	FOREIGN KEY (crypto_id)  REFERENCES crypto_metadata(id),
	FOREIGN KEY (venue_id) REFERENCES venues(id)
);

CREATE TABLE userInput (
	id INT NOT NULL AUTO_INCREMENT,
	user_email VARCHAR(255) NOT NULL UNIQUE,
	crypto_name VARCHAR(255) NOT NULL UNIQUE,
	venue VARCHAR(255) NOT NULL UNIQUE,
	venue_link VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);

CREATE TABLE userQueries (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL UNIQUE,
	message VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE admin_users (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
);
