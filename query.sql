-- Active: 1671205988832@@127.0.0.1@5432@telegram
CREATE TABLE users(
    id_user VARCHAR PRIMARY KEY,
    email_user VARCHAR NOT NULL,
    password_user VARCHAR NOT NULL,
    name_user VARCHAR,
    photo VARCHAR DEFAULT NULL
);
ALTER TABLE users ADD otp VARCHAR(32);  
ALTER TABLE users ADD verif INT;