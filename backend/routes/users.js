const express = require("express");
//const StudentModel = require('../models/student');
const User =require('../models/user')
const router = express.Router();
const _=require('../../node_modules/underscore/underscore');

router.useMethod;


//Get all the users
router.get('/', (req, res, next) => {

  User.get_all((err,users)=>{
    if(err) console.error(err);
    res.write(JSON.stringify({docs:users}));
    res.end();

    });
  });



//find the user by id
router.get('/:id',(req,res,next)=>{
  const id=req.params.id;
  User.findById(id)
  .exec()
  .then(doc=>{
    res.status(200).json(doc);
  })
  .catch(err=>{
    console.error(err)
    res.status(500).json({
      err:error
    });
  });
})

//updates the time and score or NOT if its the first time you add the game.
router.put('/updategame',(req,res,next)=>{
  const user_id=req.body.id;
  const game_id=req.body.gameID;

 User.findById(user_id,(err,user)=>{
  if(err) console.error(err);
  let allGames=user.games;
  let i=_.findIndex(allGames,{id:game_id});//return an index of the right game is present
  if(i===-1){
    //send response so the client can understand and add the user instead
    res.write(JSON.stringify({Success:false}));
    res.end()
  }else{
    user.games[i].score+=req.body.score;
    user.games[i].time_played+=req.body.time_played;
    user.games[i].last_played=new Date();
    user.save();
    res.write(JSON.stringify({Success:true,message:"User's Game Time was updated"}))
    res.end();
  }

 })

    
  });
 

router.put('/newgame', (req, res, next) => {
  const user_id=req.body.id;
  const newGamePlayed={
        gameID:req.body.game_id,
        gameName:req.body.gameName,
        score:0,
        time_played:0,
        last_played:new Date(),
        gamertag:req.body.gamertag
  }

  User.findById(user_id,(err,user)=>{
    if (err) console.log(err);
    user.games.push(newGamePlayed);
    user.save();
    res.write(JSON.stringify({Success:true,message:"Game was Added in the user's inventory"}));
    res.end();
  })

})

router.put('/removegame',(req,res,next)=>{
  const user_id=req.body.id;
  User.findById(user_id,(err,user)=>{
    if(err) console.error(err);
    let allgames=user.games;
    let i=_.findIndex(allGames,{id:game_id});
    user.games.splice(i,1);
    user.save();
    res.write(JSON.stringify({Success:true,message:"Game was removed from the user's library"}))
    res.end();
  })
})

//Add a user with empty userGame
router.post('/', (req, res, next) => {
  
  
  const newUser= new User({
    email:req.body.email,
    nickname:req.body.nickname,
    password:req.body.password,
    role:req.body.role,
    created_on:new Date(),
    games:[],
    last_login:new Date()

  })

  newUser.save()
  .then(result=>{
      res.status(201).json({
        message:"User added",
        createdUser:result
      })
    }
  )
  .catch(err=>{
    console.error(err)
  })

 

})

router.delete('/:id', (req, res, next) => {

 User.findById(req.params.id,(err,user)=>{
   if(err) res.status(500).send(err);
   else{
     user.remove(err=>{
      if(err){
      res.status(500).send(err)
      }
      else{
        res.status(204).write(JSON.stringify({Success:true,message:"Game was deleted",docs:game}));
      }
      res.end()
    });
   }
 })
});



module.exports = router;
