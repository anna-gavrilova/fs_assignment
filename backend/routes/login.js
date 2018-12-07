const express = require("express");
//const StudentModel = require('../models/student');
const User =require('../models/user')
const router = express.Router();
var session = require('express-session');

router.useMethod;


router.post("/",(req,res,next)=>{
    
   // console.log(req.body);
    User.login(req.body.username,req.body.password,(err,user)=>{
        if(err) console.error(err);
        console.log(req.headers);
        res.write(JSON.stringify({docs:user}));
        res.end();

    });
    
});

module.exports = router;