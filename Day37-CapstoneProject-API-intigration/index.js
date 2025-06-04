import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
        const joke = response.data; 
        res.render("index", { result: joke });    } catch (error) {
        console.log(error?.response?.data || error.message);
        res.send("Error fetching joke.");
    }
});

app.listen(port,()=>{
    console.log(`Server listening at port ${port}.`)
});