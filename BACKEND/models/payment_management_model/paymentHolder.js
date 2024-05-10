const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentDetailsSchema = new Schema({

    customerName:{
        type: String,
        required: true
    },

    nic:{
        type: String,
        required: true,
        unique:true
    
    },

    phoneNumber:{
        type: String,
        required: true
    },

    EmailAddress:{
        type: String,
        required: true
    },

    monthOfPayment:{
        type: String,
        required: true
    },

    monthlyCost: {
        type: Number, // Assuming monthly cost is a number
        required: true
    }
});

const paymentDetails = mongoose.model("paymentHolderDetails", paymentDetailsSchema);
module.exports = paymentDetails;
