const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());

dotenv.config({ path: './config.env'});

require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;

/* //Middleware 
const middleware = (req,res,next) => {
    console.log(`Hello my middleware`);
    next();
}   */

/*
app.get('/', (req,res) => {
    res.send(`Hello world from the server.`);
});
app.get('/about', middleware, (req,res) => {
    //res.cookie("about","123456");
    console.log(`Hello my about`);
    res.send(`About world from the server.`);
});
app.get('/contact', (req,res) => {
    res.send(`Contact world from the server.`);
});
app.get('/signin', (req,res) => {
    res.send(`SignIn to world.`);
});
app.get('/signup', (req,res) => {
    res.send(`SignUp to the world.`);
});


*/
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}.`);
})