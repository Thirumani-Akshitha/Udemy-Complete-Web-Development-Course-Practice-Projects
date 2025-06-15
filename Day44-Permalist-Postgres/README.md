# 📝 Permalist - To-Do App with PostgreSQL

A simple and beginner-friendly **To-Do List** web application built using **Node.js**, **Express.js**, **PostgreSQL**, and **EJS**, styled beautifully with **Tailwind CSS**.

This app demonstrates **CRUD fundamentals** — except the **Update** operation — by allowing users to:
- ✅ Add new tasks
- 📋 View existing tasks
- 🗑️ Delete tasks
- ☑️ Mark tasks as completed 

---

## 🌟 Features

- Add a task to your to-do list
- View all current tasks
- Delete a task
- Check/uncheck tasks with visual feedback (persistent checkbox state)
- Fully responsive and styled using Tailwind CSS

> ❌ Edit functionality is not included in this version to keep the focus on the core C, R, and D operations.

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates), Tailwind CSS
- **Database:** PostgreSQL
- **Environment Management:** dotenv


---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thirumani-Akshitha/Udemy-Complete-Web-Development-Course-Practice-Projects.git
   cd Day44-Permalist-Postgres
```

2. **Install Dependencies**

```bash

npm install```

3. **Set Up PostgreSQL**
Create a database (e.g., permalist)

Create a table using the following SQL:

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description VARCHAR NOT NULL
);

4. **Configure .env File**
Create a .env file in the root folder:

USER=your_postgres_username
PASSWORD=your_postgres_password
HOST=localhost
PORT=5432
DATABASE=permalist
DB_DIALECT=postgres
Replace the values with your actual PostgreSQL config.

**5. Run the Server**
```bash
Copy code
node index.js
The app will start running on http://localhost:3000
```

**✅ Sample Usage**
Go to localhost:3000

Add a task → It will be stored in the database

Click Delete to remove any task

Check any task
