import express from "express"; //create a server
import bodyParser from "body-parser"; // read from the data
import pg from "pg"; //talk to the database
import bcrypt from "bcrypt"; //secure the password
import session from "express-session"; //remember the user
import passport from "passport"; //checking login details
import { Strategy } from "passport-local"; //local stratergy used for username and password verification...
import GoogleStrategy from "passport-google-oauth2";
import env from "dotenv";


const app = express(); //calling express in app
const port = 3000; // port number
env.config();
const saltRounds = 10; //salting rounds for creating a secure password(stronger the encryption)

app.use(bodyParser.urlencoded({extended: true})); //reading from the forms, like username and password.
app.use(express.static("public")); //accessing the static files like css, photos etc, that are located in the public folder.

app.use(        //creates a session cookie.
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);    //when you login again you will be recogized as old user.

//setup to use in our app.
app.use(passport.initialize()); 
app.use(passport.session());

const db = new pg.Client({ //db connection
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();


//routes to show pages.
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/secrets", async(req, res) => {
  if (req.isAuthenticated()) {

    try{
      const result = await db.query("SELECT secret FROM users WHERE email = $1", [req.user.email])
      console.log(result);
      const secret = result.rows[0].secret;
      if (secret) {
  res.render("secrets.ejs", { secret: secret });
} else {
  res.render("secrets.ejs", { secret: "No submits yet!" });
}

    }catch (err){
      console.log(err);
    }

  } else {
    res.redirect("/login");
  }
});

app.get("/submit", function (req,res){
  if(req.isAuthenticated()){
  res.render("submit.ejs");
  }else{
    res.redirect("/login");
  }
});

app.post("/submit", async (req, res) => {
  const secret = req.body.secret;
  console.log("Submitted secret:", secret);
  console.log("User submitting:", req.user);
  if (!req.user) return res.redirect("/login");

  try {
    await db.query("UPDATE users SET secret = $1 WHERE email = $2", [
      secret,
      req.user.email,
    ]);
    res.redirect("/secrets");
  } catch (err) {
    console.log(err);
  }
});


app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
      console.log("OAuth Error:", err);
      console.log("User:", user);
      console.log("Info:", info);
      if (err) return res.redirect("/login");
      if (!user) return res.redirect("/login");
      req.logIn(user, (err) => {
        if (err) return res.redirect("/login");
        return res.redirect("/secrets");
      });
    })(req, res, next);
  }
);

//if user is logged in then they can see the Secrets page.

app.post("/login", passport.authenticate("local",{ //Passport checks the login using the Strategy.
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

//registering and storing the hashed password.
app.post("/register", async (req, res) => { 
  const email = req.body.username;
  const password = req.body.password;
  try{
  const checkResult = await db.query("SELECT * FROM users WHERE email = $1",[email])
  if(checkResult.rows.length>0){
    res.redirect("/login");
  }else{
    bcrypt.hash(password, saltRounds, async(err,hash)=>{
      if(err){
        console.error("Error hashing password:", err);
      }else{
    const result = await db.query("INSERT INTO users(email,password) VALUES($1,$2)",[email, hash]);
   res.render("secrets.ejs");}})
    }}catch(err){
      console.log(err);
    }
});

// when logedin passport compares if both the passwords are same. //passport.use(stra....Define how to check login credentials
passport.use("local",
  new Strategy(async function verify (username, password, cb){ //custom function verify to check credentials.
try{ //callback function used to tell Passport whether login succeeded or failed
  const result = await db.query("SELECT* FROM users WHERE email = $1 ",[username])
  if(result.rows.length>0){
    const user = result.rows[0];
    const storedHashPassword = user.password;
    bcrypt.compare(password, storedHashPassword, (err, result)=>{ //checks by using bcrypt.compare bcz password is in the hashed formate
      if(err){ 
return cb(err)
      }else{
        if(result){ //if match
          return cb(null, user); //login success
        } else{
return cb(null, false)        } // else login fail
      }
    });
  }
  else{
   return cb("Error");
  }
}catch(err){
  console.log(err);
}
}));

passport.use("google",
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    }, async(accessToken,refreshToken,profile,cb)=> {
      try{
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,]);
          if(result.rows.length===0){
            const newUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]);
              return cb(null, newUser.rows[0]);
          }else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    })
  );


passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
