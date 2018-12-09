const express = require("express");
//const StudentModel = require('../models/student');
const User =require('../models/user')
const router = express.Router();
const Util=require('../util');

router.useMethod;


router.post("/",(req,res,next)=>{
    

    User.login(req.body.username,req.body.password,(err,user)=>{
        
        if(err){
            Util.res(res,false,err.message,[])
        }
        else if(user)
        Util.res(res,true,"User logged in",user)
        else Util.res(res,false,"Wrong password",[])
    });
    
});

module.exports = router;