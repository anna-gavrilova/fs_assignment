const express = require("express");
//const StudentModel = require('../models/student');
const User =require('../models/user')
const router = express.Router();

router.useMethod;


router.post("/",(req,res,next)=>{
    

    User.login(req.body.username,req.body.password,(err,user)=>{
        
        if(err){
            console.log(err);
            res.json({Success:false, message:err.message});
        }
        else if(user)
        res.json({Success:true,docs:user,message:"User logged in"})
        else res.json({Success:true,docs:user,message:"Wrong password"})
    });
    
});

module.exports = router;