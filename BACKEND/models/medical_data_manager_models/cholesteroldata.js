const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cholesteroldataSchema= new Schema({

    nic:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
   
    level:{
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

const cholesterol = mongoose.model("cholesteroldata",cholesteroldataSchema);
module.exports = cholesterol;