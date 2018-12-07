const mongoose = require('mongoose');
var Game = require('./game').Game;
const bcrypt = require('bcrypt');


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
    return this.findOne({ email: _email}, function (err, user) {
        if (err) callback(err,null)
        else{
        bcrypt.compare(pass, user.password, function(err, res) {
            callback(err,res);
        });
    }}
    );
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