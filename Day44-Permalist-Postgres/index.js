const express = require("express"); //imports...
const Pool = require("pg").Pool;
const ejs  = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");
const { config } = require("process");
const { release } = require("os");

const app = express();
const PORT = 3000;

require("dotenv").config(); //to use env file

const pool = new Pool({
    user: process.env.USER, //process.env. - obj handling env
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DB_DIALECT // dialcet: type of database
});

app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

 pool.connect((err , client, release)=>{
    if(err){
       return console.error("error while connecting to client",err.stack);
    }
   client.query("SELECT NOW()", (err, result)=>{ //timestamp - best way to check if it is working or not.
    release();
        if(err){
        return console.error("Error at client",err.stack);
        }
     console.log("database connected");
    })
 });

 app.get("/", async (req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM tasks");
        res.render("index",{tasks: result.rows});
    }catch(err){
        console.error(err);
        res.send("Error loading tasks");
    }
 });

 app.post("/add", async(req,res)=>{
    const {addTask} = req.body;
    try{
        await pool.query("INSERT INTO tasks (description) VALUES($1)",[addTask]);
    res.redirect("/");}
    catch(err){
        console.error("Error addign task",err.message);
    }
 });

 app.post("/delete/:id", async(req,res)=>{
    const {id}= req.params;
    try{
    await pool.query("DELETE FROM tasks WHERE id = $1 ",[id]);
    res.redirect("/");}
    catch(err){
        console.error("Error occured in deleting",err.message);
    }
 });



app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});