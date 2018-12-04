const express = require("express");
//const StudentModel = require('../models/student');
const Game =require("../models/game");
const _=require('../../node_modules/underscore/underscore');

const router = express.Router();
router.useMethod;

router.get('/', (req, res, next) => {

  Game.find({},(err,games)=>{
    if(err)console.log(err);
    res.write(JSON.stringify({Success:true,message:"Games were Retrieved",docs:games}));
    res.end();
  });

});

router.get('/:id',(req,res,next)=>{

  //TODO:find uniq game
  Game.findById(req.params.id,(err,game)=>{
    if(err)console.log(err);
    res.write(JSON.stringify({Success:true,message:"Game was Retrieved",docs:game}))
    res.end();
  })
})

router.put('/:id', (req, res, next) => {



  // Implement Mongoose update game by ID

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
      res.status(201).json({
        message:"Game added",
        createdGame:result
      })
    }
  )
  .catch(err=>{
    console.error(err)
  })


})

router.delete('/:id', (req, res, next) => {

  Game.findById(req.params.id,(err,game)=>{
    if(err) res.status(500).send(err);
    game.remove(err=>{
      if(err){
      res.status(500).send(err)
      }
      else{
        //TODO: User.deleteGame(find by id(req.params.is))
        res.status(204).write(JSON.stringify({Success:true,message:"Game was deleted",docs:game}));
      }
      res.end()
    })
  })

});


module.exports = router;
