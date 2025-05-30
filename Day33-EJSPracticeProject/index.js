import express from "express";

const app=express();
const port =3000;

app.get("/", (req,res)=>{
    const data = {
        sec: new Date().getSeconds(),
        items: ["apple", "banana", "cherry"],
        htmlContent: "<strong>This is strong text</strong>"
    };
    
    res.render("index.ejs", data);
});

app.listen(port,()=>{
    console.log(`Server listening at port ${port}.`)
});