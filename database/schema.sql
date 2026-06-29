CREATE DATABASE IF NOT EXISTS github_analyzer;

USE github_analyzer;

CREATE TABLE IF NOT EXISTS profiles (

id INT AUTO_INCREMENT PRIMARY KEY,

username VARCHAR(100) UNIQUE NOT NULL,

name VARCHAR(100),

bio TEXT,

avatar_url TEXT,

public_repos INT DEFAULT 0,

followers INT DEFAULT 0,

following INT DEFAULT 0,

company VARCHAR(255),

location VARCHAR(255),

blog VARCHAR(255),

twitter_username VARCHAR(100),

github_created_at DATE,

account_age INT,

score INT,

analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);