const express = require("express");
//const StudentModel = require('../models/student');
const Game =require("../models/game");
const _=require('../../node_modules/underscore/underscore');
const Util=require('../util');

const router = express.Router();
router.useMethod;

router.get('/', (req, res, next) => {

  Game.find({},(err,games)=>{
    if(err) Util.resError(res,err)
    else
    Util.res(res,true,"Games were retrieved",games);
  });

});

router.get('/:id',(req,res,next)=>{

  Game.findById(req.params.id,(err,game)=>{
    if(err) Util.resError(res,err)
    else
    Util.res(res,true,"Game was retrieved",game)

  })
})

//returns all the gamers that play that specific game
router.get('/gamers/:id',(req,res,next)=>{
  const user=req.user;
  const game_id=req.params.id;
  Util.accessLevel(false,req,res,()=>{
  Game.get_all_players(game_id,(err,result)=>{
    if(err){
      Util.resError(res,err)
    }else{
      Util.res(res,true,"Games were retrieved",result)
    }
  })
})

})



//Adds a new game
router.post('/', (req, res, next) => {

  Util.accessLevel(true,req,res,()=>{
    const newGame= new Game({

      name:req.body.name,
      developer:req.body.developer,
      created_on:new Date(),
      genre:req.body.genre,
      release_date:req.body.release
  
    })
  
    newGame.save(newGame,(err,game)=>{
      if(err){
        Util.resError(res,err)
      }else{
        Util.res(res,true,"Game was added",newGame);
      }
    })
  });

})


//Deletes the game and removes all the references to it in user games subdocument
router.delete('/:id', (req, res, next) => {
  Util.accessLevel(true,req,res,()=>{
    Game.remove_game(req.params.id,(err,result)=>{
      if(err) Util.resError(res,err)
      else{
        Util.res(res,true,"Game was deleted",result)
      }
    })
  })


});






module.exports = router;
