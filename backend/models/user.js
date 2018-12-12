const mongoose = require('mongoose');
var Game = require('./game');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const _=require('../../node_modules/underscore/underscore');
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
    this.updateOne({_id:userId},{ $pull: {games: { _id: gameId  } } }, {new: true}, (err,doc)=>{
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
        callback(err,user);
    })
}
userSchema.statics.login=function (_email,pass,callback){
    return this.findOne({ email: _email})
    .populate('games.game')
    .exec(function (err, user) {
        if (err || !user) callback(err,null)
        else{
        bcrypt.compare(pass, user.password, function(err, res) {
            if(err || !res) callback(err,null)
            else if (res) //if passwords matched
                callback(err, user);
            // else if (user.password === pass)//just for that user with not hashed password
            //     callback(null, user);
            
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

userSchema.statics.update_fields=function(id,options,callback){
    let that=this;
    if(options.password)
    bcrypt.hash(options.password, 10, function(err, hash) {
        if(err) callback(err,null)
        else{
            options.password=hash;
            that.findOneAndUpdate({_id:id},options,{new:true},(err,user)=>{
                callback(err,user);
            })
        }
    })
    else
    this.findOneAndUpdate({_id:id},options,{new:true},(err,user)=>{
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

userSchema.pre('find', function(next) {
    this.populate('games.game');
    next();
})

module.exports=mongoose.model("User",userSchema);