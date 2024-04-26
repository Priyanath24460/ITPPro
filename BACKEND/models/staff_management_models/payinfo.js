const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payInfoSchema = new Schema({
    basicSalary: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    bonus: {
        type: Number,
        required: true
    },
    OTrate: {
        type: Number,
        required: true
    },
   
    
});

const payInfo = mongoose.model("payInfo", payInfoSchema);

module.exports = payInfo;
