# 📚 Book List CRUD App with PostgreSQL + Express + EJS

A simple web application to **Create, Read, Update, and Delete** book records, including structured `JSON` data stored in PostgreSQL.

## 🔧 Technologies Used

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **EJS (Embedded JavaScript templates)**
- **CSS (for styling)**

---

## 🚀 Features

- 📄 **View** all books
- ➕ **Add** a new book (with JSON-based `other_details`)
- ✏️ **Edit** existing book records
- ❌ **Delete** books
- ✅ User-friendly form UI with validations


---

## 🛠️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Thirumani-Akshitha/Udemy-Complete-Web-Development-Course-Practice-Projects.git
cd Udemy-Complete-Web-Development-Course-Practice-Projects/Day43-Postgres\ CRUD

Install dependencies

bash
Copy code
npm install
Set up PostgreSQL

Create a database (e.g., bookdb) and a table:

sql
Copy code
CREATE TABLE book_list (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  other_details JSONB
);
Configure DB Connection in index.js

js
Copy code
const db = new pg.Client({
  user: "your_db_user",
  host: "localhost",
  database: "bookdb",
  password: "your_password",
  port: 5432
});
Start the server

bash
Copy code
node index.js
Visit: http://localhost:3000

