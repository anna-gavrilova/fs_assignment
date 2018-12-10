var _ = require('underscore');



var util={

    res:function(res,success,message,data){
        res.json({
            success:success,
            message:message,
            docs:data
        })
    },

    roles:{
        admin:0,
        user:1
    },

    accessLevel:function(admin,req,res,callback){
        let user=req.headers.user;
        var role;
        if(req.headers.user){
            role=JSON.parse(req.headers.user).role;

            if((admin&&role===this.roles.admin)||!admin){
                callback();
            }else{
                this.resForbidden(res);
            }
        }
        else this.resForbidden(res);


    },

    resForbidden:function(res){
        res.json({
            success:false,
            message:"Forbidden",
            docs:[]
        })
    },

    resError:function(res,err){
        res.json({
            success:false,
            message:err.message,
            docs:[]
        })
    }
}

module.exports=util;