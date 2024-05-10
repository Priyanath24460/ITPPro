const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    paymentMethod: {
        type: String,
        enum: ['credit card', 'debit card'],
        required: true
    },

    cardNumber : {
        type : String,
        required : true
    },

    expireDate : {
        type : String,
        required : true
    },

    cvvNumber : {
        type : String,
        required : true
    }
})

const Payment = mongoose.model("AccountDetail",paymentSchema);

module.exports = Payment;