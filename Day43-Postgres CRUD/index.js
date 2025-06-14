const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Pool = require("pg").Pool; // pool used to access group of connections
const path = require("path"); // creates autometic paths with / or \ in diff os
const PORT =3000;
const ejs = require('ejs');

require("dotenv").config(); // imports env file to place sensitive data

const pool = new Pool({
    user: process.env.USER, //process.env. - obj handling env
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DB_DIALECT // dialcet: type of database
});

app.set("views", path.join(__dirname, "views")); //joins your filepath with views.
app.set("view engine", "ejs");
app.use("/static", express.static("static"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

pool.connect((err, client, release)=>{ //client: connection obj to run querry in the pool(your connected db)
    if(err){
        return console.error("Error in connection", err.stack) //err.stack:	Shows detailed error message
    }
    client.query("SELECT NOW()", (err,result)=>{ // SELECT NOW(): Test SQL to get the current time from DB
        release(); // returns the client to the pool (connection back to the pool). so that we can reuse the connection for something else
        if(err){
            return console.error("Error in connection", err.stack);
        }
        console.log("connect to database");
    })
})

app.get("/", async(req,res)=>{
    const data = await pool.query("SELECT * FROM book_list")
    res.render("index",{data: data.rows}) //data.rows: array of book records
})

app.post("/add", async(req,res)=>{
    const {title, author, other_details} = req.body;
    
      try {
    const details = JSON.parse(other_details); // parse JSON string
    await pool.query("INSERT INTO book_list (title, author, other_details) VALUES ($1, $2, $3)",
        [title, author, details]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error adding book:", err.message);
    res.status(400).send("Invalid JSON format in 'Other Details'");
  }
});


app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})