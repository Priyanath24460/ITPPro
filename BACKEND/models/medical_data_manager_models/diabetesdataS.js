const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const diabetesdataaSchema = new Schema({

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
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    pdf:{
        data:Buffer,
        contentType:String,
        filename:String,
    }
})
const diabetes = mongoose.model("diabetesdata",diabetesdataaSchema);
module.exports=diabetes;