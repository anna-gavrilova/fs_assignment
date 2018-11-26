var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var fs = require('fs');

const app=express();

const routesUsers=require("./routes/users");
const routesGames=require("./routes/games");

// mongoose.connect("mongodb://admin1:admin1@ds127843.mlab.com:27843/mytestdb")
//     .then(()=>{
//         console.log('Connected');
//     })
//     .catch((err)=>{
//         console.error('Connection error ',err.stack)
//     });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  
    next();
  });
  
app.use("/api/users",routesUsers);
app.use("/api/games",routesGames);

module.exports=app;
