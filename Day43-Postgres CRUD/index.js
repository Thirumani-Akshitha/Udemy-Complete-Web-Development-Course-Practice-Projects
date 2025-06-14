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
app.use("/public", express.static("public"));

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
        console.log("connected to database");
    })
})

app.get("/", async(req,res)=>{
    const data = await pool.query("SELECT * FROM book_list")
    res.render("index",{data: data.rows}) //data.rows: array of book records
})

//to Add book
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

app.post("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    await pool.query("DELETE FROM book_list WHERE id = $1",[id]);
    res.redirect("/");
});

app.get("/edit/:id", async(req,res)=>{
    const {id}= req.params;
    const result= await pool.query("SELECT * FROM book_list WHERE id = $1",[id]);
    res.render("edit", {book: result.rows[0]});
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, other_details } = req.body;

  try {
    const details = JSON.parse(other_details); // convert string to JSON

    await pool.query(
      "UPDATE book_list SET title = $1, author = $2, other_details = $3 WHERE id = $4",
      [title, author, details, id]
    );

    res.redirect("/");
  } catch (err) {
    console.error("Error updating book:", err);
    res.send("Update failed");
  }
});



app.listen(PORT, ()=>{
    console.log(`Server running at ${PORT}`);
})