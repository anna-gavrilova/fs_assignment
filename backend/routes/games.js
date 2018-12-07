const express = require("express");
//const StudentModel = require('../models/student');
const Game =require("../models/game");
const _=require('../../node_modules/underscore/underscore');

const router = express.Router();
router.useMethod;

router.get('/', (req, res, next) => {

  Game.find({},(err,games)=>{
    if(err) res.json({Success:false,message:err})
    else
    res.json({Success:true,message:"Games were Retrieved",docs:games});
  });

});

router.get('/:id',(req,res,next)=>{

  Game.findById(req.params.id,(err,game)=>{
    if(err) res.json({Success:false,message:err})
    else
    res.json({Success:true,message:"Game was Retrieved",docs:game});

  })
})

//returns all the gamers that playes that specific game
router.get('/gamers/:id',(req,res,next)=>{
  const user=req.user;
  const game_id=req.params.id;
  if(user){
    Game.get_all_players(game_id,(err,result)=>{
      if(err){
        res.json({Success:false,message:err});
      }else{
        res.json({Success:true,message:"Games were Retrieved",docs:result});
      }
    })
  }
  else
  res.json({Success:false,message:"Forbidden"});

})




router.post('/', (req, res, next) => {

  const newGame= new Game({

    name:req.body.name,
    developer:req.body.developer,
    created_on:new Date(),
    genre:req.body.genre,
    release_date:req.body.release

  })

  newGame.save()
  .then(result=>{
      res.json({
        Success:true,
        message:"Game added",
        docs:result
      })
    }
  )
  .catch(err=>{
    res.json({
      Success:false,
      message:err
    })
  })


})


//Deletes the game and removes all the references to it in user games subdocument
router.delete('/:id', (req, res, next) => {
if(req.user){
  Game.remove_game(req.params.id,(err,result)=>{
    if(err) res.json({Success:false,message:err})
    else{
      res.json({Success:true,message:result.message.nModified});
    }
  })
}else{
  res.json({Success:false,message:"Forbidden"});
}
});


module.exports = router;
