const mongoose = require('mongoose');
var Game = require('./game').Game;


var schemaOptions = {
    toObject: {
      virtuals: true
    }
    ,toJSON: {
      virtuals: true
    }
  };

const userSchema=mongoose.Schema(
    {
    email:String,
    nickname:String,
    password:String,
    role:Number,
    created_on:Date,
    games:[{
        gameID:String,
        gameName:String,
        score:Number,
        time_played:Number,
        last_played:Date,
        gamertag:String
     }],
    last_login:Date

    },schemaOptions);


userSchema.statics.login=function (_email,pass,callback){

    return this.find({email:_email,password:pass})
            .exec(function(err,users){
               callback(err,users);
            });
}

userSchema.statics.get_all=function(callback){
    return this.find().exec(function(err,user){
        callback(err,user);
    })
}

userSchema.virtual('bestGame').get(function(){
    if(this.games.length!==0){
        let tempBestGame=this.games[0];
        this.games.forEach(game=>{
            if(game.score>tempBestGame.score){
                tempBestGame=game;
            }
        })
        return tempBestGame;
    }
})

module.exports=mongoose.model("User",userSchema);