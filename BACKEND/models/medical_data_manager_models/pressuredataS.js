const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const pressuredataSchema= new Schema({

    nic:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    high:{
        type:Number,
        require:true
    },
    low:{
        type:Number,
        require:true
    },
    date: {
        type: Date,  // Assuming date is stored as a Date in MongoDB
        default: Date.now  // Default to the current date when creating a new record
        
    },
    pdf: {
        data: Buffer,
        contentType: String,
        filename: String, // MIME type of the PDF file
    }

    



})
const pressure = mongoose.model("pressuredata",pressuredataSchema);
module.exports = pressure;