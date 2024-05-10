const mongoose = require('mongoose');

const Schema = mongoose.Schema
const residentsSchema = new Schema({

    resName:{
        type: String,
        required:true
    },
    NIC:{
        type: String,
        required:true,
        unique: true
        
    },
    roomID:{
        type:String,
        required:true
    }

})

const Residents = mongoose.model("Resident",residentsSchema);

module.exports = Residents;
