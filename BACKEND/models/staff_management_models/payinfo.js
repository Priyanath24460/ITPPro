const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payInfoSchema = new Schema({
    adminBasic : {
        type : Number,
        required: true
    },
    managerBasic : {
        type :Number,
        required : true
    },
    bonus:{
        type: Number,
        required: true
    },
    OTrate:{
        type:Number,
        required: true
    }


})

const payInfo = mongoose.model("payInfo", payInfoSchema);

module.exports = payInfo;