  GitHub Profile Analyzer API

A RESTful backend application built with Node.js,Express.js and MySQL that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

---

 Overview

This project fetches a GitHub user's public profile information, analyzes useful statistics, stores the results in a MySQL database, and provides REST APIs to retrieve the stored profiles.

This project was developed as part of a Node.js Internship Assignment.

---

 Features

- Analyze any GitHub user using their username
- Fetch public profile information from GitHub API
- Store analyzed data in MySQL
- Update existing profile if already analyzed
- Retrieve all analyzed profiles
- Retrieve a single analyzed profile
- Calculate a custom profile score
- Calculate GitHub account age
- Proper error handling
- Environment variable support

---

 Tech Stack

- Node.js
- Express.js
- MySQL
- Axios
- Dotenv
- mysql2
- CORS
- Nodemon

---

 Project Structure

```
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── profileController.js
│
├── models/
│   └── profileModel.js
│
├── routes/
│   └── profileRoutes.js
│
├── services/
│   └── githubService.js
│
├── utils/
│   └── calculateScore.js
│
├── database/
│   └── schema.sql
│
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

---

 Installation

 1. Navigate to project

```bash
cd github-profile-analyzer
```

---

 2. Install dependencies

```bash
npm install
```

---

 3. Create `.env`

Create a `.env` file in the project root.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=github_analyzer

GITHUB_TOKEN=
```

---

 Database Setup

Create the database:

```sql
CREATE DATABASE github_analyzer;
```

Select the database:

```sql
USE github_analyzer;
```

Create the table:

```sql
CREATE TABLE profiles (
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
```

---

 Run the Project

 Development Mode

```bash
npm run dev
```

 Production Mode

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

 API Endpoints

 1. Analyze GitHub Profile

POST

```
/api/profile/analyze
```

Request Body

```json
{
  "username": "octocat"
}
```

Sample Response

```json
{
  "success": true,
  "message": "Profile analyzed successfully",
  "data": {
    "username": "octocat",
    "name": "The Octocat",
    "followers": 18000,
    "following": 9,
    "publicRepos": 8,
    "score": 54025,
    "accountAge": 15
  }
}
```

---

2. Get All Profiles

GET

```
/api/profile
```

Sample Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "username": "octocat",
      "followers": 18000
    },
    {
      "username": "torvalds",
      "followers": 250000
    }
  ]
}
```

---

3. Get Single Profile

GET

```
/api/profile/:username
```

Example:

```
GET /api/profile/octocat
```

---

Testing

The APIs can be tested using TunderClient/Postman.

Analyze Profile

```
POST http://localhost:5000/api/profile/analyze
```

Get All Profiles

```
GET http://localhost:5000/api/profile
```

Get Single Profile

```
GET http://localhost:5000/api/profile/octocat
```

---

 Database Schema

| Column | Type |
|----------|------|
| id | INT |
| username | VARCHAR(100) |
| name | VARCHAR(100) |
| bio | TEXT |
| avatar_url | TEXT |
| public_repos | INT |
| followers | INT |
| following | INT |
| company | VARCHAR(255) |
| location | VARCHAR(255) |
| blog | VARCHAR(255) |
| twitter_username | VARCHAR(100) |
| github_created_at | DATE |
| account_age | INT |
| score | INT |
| analyzed_at | TIMESTAMP |

---

 Dependencies

- express
- mysql2
- axios
- dotenv
- cors
- nodemon

Install them using:

```bash
npm install
```

---

 Future Improvements

- Pagination
- Sorting
- Search by username
- GitHub Personal Access Token
- Favorite Programming Language
- Total Stars Count
- Top Repository Analysis
- Docker Support
- Unit Testing

---

 Example Workflow

```
User
   │
   ▼
POST /api/profile/analyze
   │
   ▼
GitHub API
   │
   ▼
Analyze Profile
   │
   ▼
Store in MySQL
   │
   ▼
Return JSON Response
```

---
