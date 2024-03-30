const mongoose = require("mongoose");
const Schema=mongoose.Schema;


const patientSchema = new Schema({

    nic:{

        type:String,
        required:true

    },

    name:{

        type:String,
        required:true

    },
    date: {
        type: Date,  // Assuming date is stored as a Date in MongoDB
        default: Date.now  // Default to the current date when creating a new record
        
    },

    diabetes:{

        type:String,
        required:true

    },

    cholesterol:{

        type:String,
        required:true

    },
    pressure:{
        type:String,
        required:true
    },
    
    otherdiseases:{
        type:String,
        required:true
    }

    

})

const Patient = mongoose.model("patient",patientSchema);

module.exports = Patient;