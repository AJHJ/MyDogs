//import { openDB, getImageAddresses, closeDB } from './db.js';

//const { openDB, getImagesURL, closeDB, signUp, logIn } = require('./db.js');
const Database = require('./db.js');
const path = require('path');


require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const fs = require('node:fs');
const http = require('http');
const https = require('https');
const app = express();
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;


// This session function automatically catches incoming requests and checks if there is a valid session
app.use(session({
  secret: process.env.SERVER_SECRET, // Secret key used to sign the cookie
  resave: false,                    // Avoids resaving unmodified sessions
  saveUninitialized: false,         // Complies with privacy laws; reduces server usage
  cookie: {
    httpOnly: true,                 // Shields cookie from client-side JavaScript (XSS protection)
    secure: false,                  // Set to true in production (requires HTTPS)
    //maxAge: 1000 * 60 * 60 * 24     // Session cookie lifespan in milliseconds (1 day)
  }
}));

app.use(
    cors({
        origin: ["http://localhost:5173"]
    })
);

app.use(express.json());

const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

app.use(express.static("dist"));

//Route
app.get("/", (req, res) => {
    res.send("Welcome to the node server");
});

app.get("/imagesURL", (req, res) => {
    const database = new Database();
    const imagesURL = database.getImagesURL();
    const result = database.closeDB();
    //const urlArray = [];
        //imagesURL.map(url => urlArray.push(url)
    //);
    res.json(imagesURL);
});

// Serve files from the "public/images" directory under the "/images" route URL
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/signup', (req, res) => res.render('signup', { error: null }));
app.post('/signup', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const repeatpassword = req.body.repeatpassword;
    const databass = new Database();
    const signUpRes = await databass.signUp(username, password, repeatpassword);
    const closeRes = databass.closeDB();

    if(signUpRes == true){
        res.json({ message: 'User created successfully, you can login now.' });
    }else{
        res.json({ message: 'Error: Username is already taken or passwords dont match.' });
    }
    
});

app.get('/login', (req, res) => res.render('login', { error: null }));
app.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const database = new Database();
    const logInRes = await database.logIn(username, password);
    if(logInRes == true){
        req.session.username = username;
    }
    const result = database.closeDB();
    
    if(logInRes == true){
        res.json({ isSuccess: true, username: username});
    }else{
        res.json({ isSuccess: false});
    }
});

app.get('/logout', (req, res) => req.session.destroy(() => res.json({ isSuccess: true}) ));
app.post('/logout', (req, res) => req.session.destroy(() => res.json({ isSuccess: true}) ));

// HTTP Server
http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`HTTP Server running on http://localhost:${HTTP_PORT}`);
});

// HTTPS Server
https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${HTTPS_PORT}`);
});

