//import { openDB, getImageAddresses, closeDB } from './db.js';

const { openDB, getImageAddresses, closeDB } = require('./db.js');

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;


app.use(
    cors({
        origin: ["http://localhost:5173"]
    })
);

//Route
app.get("/", (req, res) => {
    res.send("Welcome to the node server");
});

app.get("/images", (req, res) => {
    const database = openDB();
    const imageAddresses = getImageAddresses(database);
    const result = closeDB(database);
    //const addressesArray = [];
        //imageAddresses.map(address => addressesArray.push(address)
    //);
    res.json(imageAddresses);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

