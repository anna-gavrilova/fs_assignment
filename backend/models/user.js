const mongoose = require('mongoose');
var Game = require('./game');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var fs = require('fs');


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
        game:{ type: Schema.Types.ObjectId, ref: 'Game' },
        score:Number,
        time_played:Number,
        last_played:Date,
        gamertag:String
     }],
    last_login:Date,
    img: String

    },schemaOptions);


userSchema.statics.new_user=function(user,callback){
    user.save((err,user)=>{
        callback(err,user);
    })
}

userSchema.statics.remove_game=function(userId,gameId,callback){
    this.update({_id:userId},{ $pull: {games: { $elemMatch:{_id:gameId} } } },{multi:true},(err,doc)=>{
        callback(err,doc);
    });
}

userSchema.statics.remove_user=function(id,callback){
    this.findOneAndDelete({_id:id},(err,game)=>{
        callback(err,game);
    })
}
userSchema.statics.get_single_user=function(id,callback){
    this.findById(id,(err,user)=>{
        console.log(id);
        callback(err,user);
    })
}
userSchema.statics.login=function (_email,pass,callback){
    return this.findOne({ email: _email}, function (err, user) {
        if (err || !user) callback(err,null)
        else{
        bcrypt.compare(pass, user.password, function(err, res) {
            if (res)
                callback(err, user);
            else if (user.password === pass)
                callback(null, user);
        });
    }}
    );
}

userSchema.statics.get_all=function(callback){
    return this.find().exec(function(err,user){
        callback(err,user);
    })
}

userSchema.statics.upload_picture=function(id,file,originalfile,callback){
    this.findById(id,(err,user)=>{
        var target_path = 'uploads/' + originalfile;
        var src = fs.createReadStream(file);
        var dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on('end', function() {
            fs.unlink(file,(err)=>{})
            if(user.img!=="assets/default.jpg"&&user.img!==target_path)
                fs.unlink(user.img, (err) => {
                  if (err) console.log(err.message)
                });
           
            user.img=target_path;
            user.save((err,user)=>{
                if(err) callback(err,null);
                else callback(null,user)
              })
            })
        });
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