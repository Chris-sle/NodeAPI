CREATE DATABASE expressxnode;
USE expressxnode;

CREATE TABLE users (
	ID INT PRIMARY KEY,
	EMAIL VARCHAR(100),
	[NAME] VARCHAR(100),
	AGE INT
);

INSERT INTO users VALUES(1, 'admin@domain.com', 'admin', 100);