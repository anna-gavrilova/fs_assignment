var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors');

const app=express();
app.use(cors());


const routesUsers=require("./routes/users");
const routesGames=require("./routes/games");
const loginRoute=require("./routes/login");

mongoose.connect("mongodb://admin1:admin1@ds163656.mlab.com:63656/gamer_lobby")
    .then(()=>{
        console.log('Connected');
    })
    .catch((err)=>{
        console.error('Connection error ',err.stack)
    });


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept', 'user');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/api/users",routesUsers);
app.use("/api/games",routesGames);
app.use("/api/login",loginRoute);

module.exports=app;
