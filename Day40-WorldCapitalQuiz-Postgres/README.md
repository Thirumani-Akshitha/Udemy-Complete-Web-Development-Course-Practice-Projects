# 🌍 World Capitals Quiz App

A fun and interactive web quiz built using **Node.js**, **Express.js**, **PostgreSQL**, and **EJS**. The app tests your knowledge of world capitals and keeps track of your score.

---

## 🚀 Features

- Serves random country-based questions from a PostgreSQL database
- User submits their guess for the capital
- Tracks and displays score dynamically
- Clean UI using EJS templating
- Secure setup using environment variables

---

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **PostgreSQL** – Relational database
- **EJS** – Server-side rendering for frontend
- **dotenv** – Environment variable management
- **body-parser** – Middleware to parse form data


---

## 🗃️ Database Setup

1. Create a PostgreSQL database named `world`.
2. Create a table named `capitals`:

```sql
CREATE TABLE capitals (
  id SERIAL PRIMARY KEY,
  county VARCHAR(255),  -- If this is a typo, change to 'country'
  capital VARCHAR(255)
);

## 🔐 Environment Setup
Create a .env file in the project root:

DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=world
DB_PASSWORD=your_postgres_password
DB_PORT=5432

## 🚀 Getting Started

### 1. Clone the Repository

### 2. Install Dependencies
```bash
npm install
```
### 3. Run the Servers
(port 3000)
type: node index.js

Now, visit:
🔗 http://localhost:3000

## 🌟 Future Improvements
Add user authentication and score history

Difficulty levels and timed questions

UI improvements with Tailwind CSS or Bootstrap

Deploy using Render or Railway.

