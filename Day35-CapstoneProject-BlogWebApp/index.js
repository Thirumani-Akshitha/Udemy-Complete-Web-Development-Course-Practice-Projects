import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let blogs = [];

app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/post",(req,res)=>{
    res.render("post.ejs");
})

app.post("/post", (req,res)=>{
    const blog={
        title: req.body.title,
        content: req.body.content
    };
    blogs.unshift(blog);
    res.redirect("/show");
});

app.get("/compose",(req,res)=>{
    res.render("compose.ejs");
})

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.get("/faqs",(req,res)=>{
    res.render("faqs.ejs");
})

app.get("/show",(req,res)=>{
    res.render("show.ejs",{blogs: blogs});
})


app.get("/show/:id", function(req, res) {
    const blogId = parseInt(req.params.id, 10); 
    const blog = blogs[blogId]; 

    if (blog) {
        res.render("fullBlog", { blog }); 
    } else {
        res.status(404).send("Blog not found");
    }
});


app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})