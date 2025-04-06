import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
const __dirname = dirname(fileURLToPath(import.meta.url));

import weatherData from "../utils/weatherData.js";

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(join(__dirname, "../public")));
// app.use(express.static(join(__dirname, "../templates/views")));
// app.use(express.static(join(__dirname, "../templates/partials")));
const publicPath = join(__dirname, "../public");
const viewsPath = join(__dirname, "../templates/views");
const partialsPath = join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));


app.get("/", (req, res) => {
    res.render("index", {title: "Weather App"});
});

app.get("/weather", (req,res) =>{
    if(!req.query.address){
        return res.send("Address is required");
    }
    weatherData(req.query.address, (error, result) => {
        if(error){
            return res.send(error);
        }
        res.send(result);
    })
});

app.use((req, res) => {
    res.render( "404", {title: "Page not found!"});
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});