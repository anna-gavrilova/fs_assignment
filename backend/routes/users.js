const express = require("express");
//const StudentModel = require('../models/student');
const User =require('../models/user')
const router = express.Router();
const bcrypt = require('bcrypt');
const _=require('../../node_modules/underscore/underscore');
const Util=require('../util');

router.useMethod;


//Get all the users
router.get('/', (req, res, next) => {

  User.get_all((err,users)=>{
    console.log(req.headers.user);
    console.log(JSON.parse(req.headers.user).role);
    if(err){        
      Util.res(res,false,err.message,[]);
    }
    else{
      Util.res(res,true,"Users were retrieved",users);

    }
    });
  });



//find the user by id
router.get('/:id',(req,res,next)=>{
  const id=req.params.id;
  User.get_single_user(id,(err,user)=>{
    if(err)
    Util.resError(res,err);
    else
    Util.res(res,true,"User was found",user)

  })
})

//updates the time and score or NOT if its the first time you add the game.
router.put('/updategame',(req,res,next)=>{
  const user=req.user;
  const user_id=user.user;
  const role=req.user.role;
  const game_id=req.body.gameID;
  Util.accessLevel(false,req,res,()=>{
    User.findById(user_id,(err,user)=>{
      if(err) Util.res(res,false,err.message,[])
    else{
    let allGames=user.games;
    let i=_.findIndex(allGames,{id:game_id});//return an index of the right game is present
     if(i===-1){
        //send response so the client can understand and add the user instead
        Util.res(res,false,"No game to update",[]);
      }else{
        user.games[i].score+=req.body.score;
        user.games[i].time_played+=req.body.time_played;
        user.games[i].last_played=new Date();
        user.save();
        Util.res(res,true,"Game And Score were updated",user)

      }

}
});
  })   
  });
 

router.put('/newgame', (req, res, next) => {

  Util.accessLevel(false,req,res,()=>{
    const user_id=JSON.parse(req.headers.user).user
    const newGamePlayed={
      game:req.body.game,
      score:0,
      time_played:0,
      last_played:new Date(),
      gamertag:req.body.gamertag
}

User.findById(user_id,(err,user)=>{
  if (err) Util.resError(res,err)
  else{
    user.games.push(newGamePlayed);
    user.save();
    Util.res(res,true,"Game was added to the inventory",newGamePlayed);
  }

})
  })
  



});

router.put('/removegame',(req,res,next)=>{


    Util.accessLevel(true,req,res,()=>{
      const user=req.user;
      const user_id=user.user;
      const game_id=req.body.game
      User.remove_game(user_id,game_id,(err,result)=>{
        if(err) Util.resError(res,err);
        else{
          Util.res(res,true,"Game was removed from inventory",result)
        }

      })



      // User.findById(user_id,(err,user)=>{
      //   if(err) Util.res(res,false,err.message,[]);
      //   else{
      //   let i=_.findIndex(user.games,{id:game_id});
      //   rm=user.games.splice(i,1);
      //   user.save();
      //   Util.res(res,true,"Game was removed from inventory",rm);
      //   }
      // })

    })
 
});

//Add a user with empty userGame
router.post('/', (req, res, next) => {
Util.accessLevel(true,req,res,()=>{
  const newUser= new User({
    email:req.body.email,
    nickname:req.body.nickname,
    role:req.body.role,
    created_on:new Date(),
    games:[],
    last_login:new Date()
  
  })
  
   bcrypt.hash(req.body.pass, 10, function(err, hash) {
     if(err) Util.resError(res,err);
     else{
       
       newUser.password=hash;
      User.new_user(newUser,(err,user)=>{
        if(err) Util.resError(res,err);
        else
        Util.res(res,true,"User was added",user)
      })
      }  
    });
})
})

router.delete('/:id', (req, res, next) => {
  Util.accessLevel(true,req,res,()=>{
    User.remove_user(req.params.id,(err,result)=>{
      if(err) Util.resError(res,err)
      else{
        Util.res(res,true,"User was deleted",result)
      }
    })
  });
});



//upload a picture


module.exports = router;
