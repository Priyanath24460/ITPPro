const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cholesterolMedicineSchema = new Schema({


    nic:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    morningMedicine:{
        type:String,
        required:true   
    },

    morningdosage:{
        type:Number,
        require:true
    },

    nightMedicine:{
        type:String,
        required:true   
    },

    nightdosage:{
        type:Number,
        require:true
    },

    date: {
        type: Date,  // Assuming date is stored as a Date in MongoDB
        default: Date.now  // Default to the current date when creating a new record
        
    },

})

const cholesterolMedicine = mongoose.model("cholesterolmedicinedata",cholesterolMedicineSchema);
module.exports = cholesterolMedicine;