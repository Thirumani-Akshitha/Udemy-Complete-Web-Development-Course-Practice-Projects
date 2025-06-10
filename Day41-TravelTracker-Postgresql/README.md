# 🌍 Visited Countries Tracker

This is a full-stack web app where users can enter countries they've visited and see them highlighted on an interactive world map.

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Frontend:** HTML, CSS, JavaScript, EJS
- **Map Visualization:** SVG map

---

## 🧠 Features

- Add a country by name using a form
- Country is matched in the database and saved to a `visited_countries` table
- Visited countries are highlighted on a world map
- Error handling for:
  - Invalid country names
  - Duplicate entries


---

## 🗄️ PostgreSQL Setup

Make sure PostgreSQL is installed and running.

1. Create a database called `world`.
2. Create the tables:

```sql
CREATE TABLE countries (
  country_code VARCHAR(2) PRIMARY KEY,
  country_name VARCHAR(100) NOT NULL
);

CREATE TABLE visited_countries (
  id SERIAL PRIMARY KEY,
  country_code VARCHAR(2) REFERENCES countries(country_code) UNIQUE
);

### Populate the countries table with country names and 2-letter ISO codes.

git clone https://github.com/yourusername/visited-countries-app.git
cd visited-countries-app
npm install
node index.js

Then, open http://localhost:3000 in your browser.

### 🛠️ Future Plans
✅ Add India-specific version 🇮🇳

Add user authentication

Save visit date and notes

Mobile responsiveness