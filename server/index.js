//import { openDB, getImageAddresses, closeDB } from './db.js';

const { openDB, getImagesURL, closeDB } = require('./db.js');
const path = require('path');

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;


app.use(
    cors({
        origin: ["http://localhost:5173"]
    })
);

app.use(express.static("dist"));

//Route
app.get("/", (req, res) => {
    res.send("Welcome to the node server");
});

app.get("/imagesURL", (req, res) => {
    const database = openDB();
    const imagesURL = getImagesURL(database);
    const result = closeDB(database);
    //const urlArray = [];
        //imagesURL.map(url => urlArray.push(url)
    //);
    res.json(imagesURL);
});

// Serve files from the "public/images" directory under the "/images" route URL
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

