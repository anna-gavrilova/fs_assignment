

const mongoose = require('mongoose');
var User = require('./user');

const gameSchema=mongoose.Schema({

    name:String,
    developer:String,
    created_on:Date,
    genre:String,
    release_date:Date

})



module.exports=mongoose.model('Game',gameSchema);