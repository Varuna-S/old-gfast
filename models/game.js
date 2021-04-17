const mongoose = require('mongoose');

//mongoose schema for game
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: 1,
        maxlength: 150
    },
    genre: {
        type: String,
        required: [true, 'genre is required'],
        minlength: 1,
        maxlength: 150
    },
    developerName: {
        type: String,
        required: [true, 'developer name is required'],
        minlength: 1,
        maxlength: 150
    },
    publisherName: {
        type: String,
        required: [true, 'publisher name is required'],
        minlength: 1,
        maxlength: 150
    },
    gameEngine: {
        type: String,
        required:  [true, 'game engine name is required'],
        minlength: 1,
        maxlength: 100
    },
    releaseDate: {
        type: Date,
        min: '1970-01-01',
        required:  [true, 'release date is required'],
        validate:{
            validator: function(rd){
                dateNow  = new Date();
                return (rd.getYear() > dateNow.getYear() || rd.getMonth() > dateNow.getMonth() || rd.getDate() > dateNow.getDate())? 0 : 1;
            },
            message:'Invalid date'
        }
    }
});

// model from game schema
const Game = mongoose.model('Game', gameSchema);




exports.Game = Game;