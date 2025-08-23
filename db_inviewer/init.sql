CREATE USER 'diego'@'%' identified by 'mysqlpassword';
grant all privileges on *.* to 'diego'@'%' with grant option;
flush privileges;

CREATE DATABASE IF NOT EXISTS inviewer;
USE inviewer;

CREATE TABLE users (
    user_id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(30),
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(15) NOT NULL,
    birthdate DATE NOT NULL
);

CREATE TABLE jobs (
    work_id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(500) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    boss BINARY(16) NOT NULL,
    FOREIGN KEY (boss) REFERENCES users (user_id)
);

CREATE TABLE reset_passwords (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email VARCHAR(100),
    code VARCHAR(6),
    expires_in DATETIME
);

CREATE TABLE skills (
    skill_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    skill VARCHAR(50)
);

CREATE TABLE check_email (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    email VARCHAR(100),
    code VARCHAR(6),
    expires_in DATETIME
);

CREATE TABLE solicitudes (
    solicitude_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())),
    user_id BINARY(16),
    work_id BINARY(16),
    created_at TIMESTAMP DEFAULT (NOW()),
    resume_url VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (work_id) REFERENCES jobs (work_id),
    PRIMARY KEY (user_id, work_id)
);

CREATE TABLE user_skills (
    user_id BINARY(16),
    skill_id INT,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (skill_id) REFERENCES skills (skill_id),
    PRIMARY KEY (user_id, skill_id)
);