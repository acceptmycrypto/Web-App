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
	accepted_crypto BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (id)
);

CREATE TABLE deals (
	id INT NOT NULL AUTO_INCREMENT,
	venue_id INT NOT NULL,
	deal_name VARCHAR(255) NOT NULL,
	deal_description VARCHAR(255) NOT NULL,
	deal_image VARCHAR(255) NOT NULL,
	pay_in_dollar DECIMAL(10,2) NOT NULL,
	pay_in_crypto DECIMAL(10, 2) NOT NULL,
	date_expired DATETIME NULL,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (venue_id) REFERENCES venues(id)
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


CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL UNIQUE,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR (255) NOT NULL,
	phone_number VARCHAR(100) NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(30) BINARY NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE user_logins(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	sign_in_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_profiles(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	bio TEXT NULL,
	photo VARCHAR(255) NULL,
	user_location VARCHAR(255) NULL,
	birthday DATE NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_cryptos(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	crypto_id INT NOT NULL,
	crypto_address VARCHAR(255) NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (crypto_id) REFERENCES crypto_info(id)
);

CREATE TABLE users_purchases(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	deal_id INT NOT NULL,
	crypto_id INT NOT NULL,
	amount DECIMAL(10, 4) NOT NULL,
	date_purchased TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (deal_id) REFERENCES deals(id),
	FOREIGN KEY (crypto_id) REFERENCES crypto_info(id)
);

CREATE TABLE users_matched_friends(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	matched_friend_id INT NOT NULL,
	date_matched TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_accepted BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (matched_friend_id) REFERENCES users(id)
);

CREATE TABLE crypto_comments(
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
  crypto_id INT NOT NULL,
  body TEXT NOT NULL,
  date_commented TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (crypto_id) REFERENCES crypto_info(id)
);

CREATE TABLE parents_children(
	comment_parent_id INT NOT NULL,
	comment_child_id INT NOT NULL,
	FOREIGN KEY (comment_parent_id) REFERENCES crypto_comments(id),
	FOREIGN KEY (comment_child_id) REFERENCES crypto_comments(id)
);

