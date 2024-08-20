CREATE TABLE BOOKS (
id SERIAL PRIMARY KEY,
userId INT NOT NULL,
title VARCHAR(256),
author VARCHAR(256),
numberOfPages INT,
currentPage INT,
startDate DATE DEFAULT CURRENT_DATE,
finishDate DATE,
currentlyReading BOOLEAN
);