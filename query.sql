-- Active: 1674133723398@@127.0.0.1@5432@postgres
CREATE TABLE users(
    id_user VARCHAR PRIMARY KEY,
    email_user VARCHAR NOT NULL,
    password_user VARCHAR NOT NULL,
    name_user VARCHAR,
    photo VARCHAR DEFAULT NULL
);
ALTER TABLE users ADD otp VARCHAR(32);  
ALTER TABLE users ADD verif INT;
ALTER TABLE users ADD username VARCHAR DEFAULT NULL;  
ALTER TABLE users ADD bio VARCHAR DEFAULT NULL; 
ALTER TABLE users ADD phone_number BIGINT DEFAULT NULL;

CREATE Table chat(
    id_chat SERIAL PRIMARY KEY NOT NULL,
    receiver_id VARCHAR ,
    sender_id VARCHAR,
    message varchar,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);