const express = require("express");
//const StudentModel = require('../models/student');
const User =require('../models/user')
const router = express.Router();
const bcrypt = require('bcrypt');
const _=require('../../node_modules/underscore/underscore');

router.useMethod;


//Get all the users
router.get('/', (req, res, next) => {

  User.get_all((err,users)=>{
    console.log(req.headers.user);
    console.log(JSON.parse(req.headers.user).role);
    if(err){        
      res.json({Success:false,message:err});
    }
    else{
    res.json({docs:users});

    }
    });
  });



//find the user by id
router.get('/:id',(req,res,next)=>{
  const id=req.params.id;
  User.findById(id)
  .exec()
  .then(doc=>{
    res.json({
      Success:true,
      message:"User found!",
      docs:doc
    });
  })
  .catch(err=>{
    res.status(500).json({
      Success:false,
      message:err
    });
  });
})

//updates the time and score or NOT if its the first time you add the game.
router.put('/updategame',(req,res,next)=>{
  const user=req.user;
  const user_id=user.user;
  const role=req.user.role;
  const game_id=req.body.gameID;
  if(user){
    User.findById(user_id,(err,user)=>{
        if(err) res.json({Success:false,message:err});
  else{
      let allGames=user.games;
      let i=_.findIndex(allGames,{id:game_id});//return an index of the right game is present
       if(i===-1){
          //send response so the client can understand and add the user instead
          res.json({Success:false});
        }else{
          user.games[i].score+=req.body.score;
          user.games[i].time_played+=req.body.time_played;
          user.games[i].last_played=new Date();
          user.save();
          res.json({Success:true,message:"User's Game Time was updated"});

        }

  }
  });
}else{
  res.json({Success:false,message:"Forbidden"});
}

    
  });
 

router.put('/newgame', (req, res, next) => {
  const user=req.user;
  const user_id=user.user;
  const newGamePlayed={
        gameID:req.body.game_id,
        gameName:req.body.gameName,
        score:0,
        time_played:0,
        last_played:new Date(),
        gamertag:req.body.gamertag
  }
if(user){
  User.findById(user_id,(err,user)=>{
    if (err) console.log(err);
    user.games.push(newGamePlayed);
    user.save();
    res.json({Success:true,message:"Game was Added in the user's inventory"});
  })

}else{
  res.json({Success:false,message:"Forbidden"});
}

});

router.put('/removegame',(req,res,next)=>{
  const user=req.user;
  const user_id=user.user;
  if(user){
  User.findById(user_id,(err,user)=>{
    if(err)  res.json({Success:false,message:"Error"});
    else{
    let i=_.findIndex(allGames,{id:game_id});
    user.games.splice(i,1);
    user.save();
    res.json({Success:true,message:"Game was removed from the user's library"});
    }
  })
}else{
  res.json({Success:false,message:"Forbidden"});
}


});

//Add a user with empty userGame
router.post('/', (req, res, next) => {



 const newUser= new User({
  email:req.body.email,
  nickname:req.body.nickname,
  role:req.body.role,
  created_on:new Date(),
  games:[],
  last_login:new Date()

})

 bcrypt.hash(req.body.pass, 10, function(err, hash) {
   if(err) res.json({ 
            Success:false,
            message:"User  not added"
          })
   else{
     newUser.password=hash;
     newUser.save()
     .then(result=>{
      res.json({
        Success:true,
        message:"User added",
        createdUser:result
      })
    }
  )
  .catch(err=>{
    res.json({ 
      Success:false,
      message:"User  not added"
    })
  })
   }
  });



 

})

router.delete('/:id', (req, res, next) => {

 User.findById(req.params.id,(err,user)=>{
   if(err) res.json({Success:false,messageerr});
   else{
     user.remove(err=>{
      if(err){
      res.status(500).send(err)
      }
      else{
        res.json({Success:true,message:"Game was deleted",docs:game});
      }
    });
   }
 })
});



module.exports = router;
