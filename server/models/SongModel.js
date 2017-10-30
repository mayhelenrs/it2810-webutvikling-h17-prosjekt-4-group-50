let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Song = new Schema({
    name: {
        type: String,
        required: "Kindly enter the name of the song"
    },
    duration: {
        type: Number

    },
    album: {
        type: String,
    }
    
});

module.exports = mongoose.model("Song", Song);