const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payRollSchema = new Schema({
    nic : {
        type : String,
        required: true
    },
    name : {
        type :String,
        required : true
    },
    position:{
        type: String,
        required: true
    },
    salary:{
        type:Number,
        required: true
    }


})

const payRoll = mongoose.model("payRoll", payRollSchema);

module.exports = payRoll;