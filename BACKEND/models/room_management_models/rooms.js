const mongoose = require('mongoose');

const Schema = mongoose.Schema
const roomsSchema = new Schema({

    roomID:{
        type:String,
        required:true
    },
    numOfBeds:{
        type:Number,
        required:true
    },
    bathroomType:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    assignedBeds:{
        type:Number,
        default:0
    },
    availabilityStatus:{
        type:String,
        default:'Available'
    },
    
})

const Rooms = mongoose.model("Room",roomsSchema);

module.exports = Rooms;

                                                     