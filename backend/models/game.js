const mongoose = require('mongoose');
const User = require('./user');

const gameSchema=mongoose.Schema({

    name:String,
    developer:String,
    created_on:Date,
    genre:String,
    release_date:Date

})


gameSchema.statics.add_new=function(game,callback){

    game.save((err,game)=>{
        callback(err,game);
    })
}

gameSchema.statics.get_all_players=function(gameid,callback){
    return User.find({'games.gameID':gameid},(err,result)=>{
        callback(err,result);
    })
}

gameSchema.statics.remove_game=function(gameid,callback){

   return this.findOneAndDelete({_id:gameid},(err,result)=>{
        if(err) return err;
        mongoose.models['User'].update({},{ $pull: {games: { $elemMatch:{'game._id':gameid} } } },{multi:true},(err,result)=>{
            if (err) return err
            else{
            callback(err,result);
            }
        });

    })
}



module.exports=mongoose.model('Game',gameSchema);