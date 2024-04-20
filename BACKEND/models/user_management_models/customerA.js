const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const customerASchema = new Schema({
    name : {
        type : String,
        required: true
    },
    nic : {
        type : String,
        required: true,
        unique: true
        
    },
    age : {
        type : Number,
        required: true
    },
    birthdate : {
        type : Date,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    contactnumber : {
        type : String,
        required : true
    },
    gname : {
        type : String,
        required: true
    },
    gnic : {
        type : String,
        required: true
    },
    gcontactnumber : {
        type : String,
        required : true
    },
    gaddress : {
        type : String,
        required : true
    },
    password :{ 
        type : String,
        required : true
    },
    confirmpassword: {
        type: String, // Add this line if you want to include a confirmpassword field
        required: true
    },
    role: { 
        type: String, 
        default: 'elder' // Default value set to 'elder'
    }
});

// Define a method to compare passwords
customerASchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('Comparing passwords:', candidatePassword, this.password);
        console.log('Stored hashed password:', this.password);
        
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        
        console.log('Password match result:', isMatch);
        return isMatch;
    } catch (error) {
        throw error;
    }
};




const customerA = mongoose.model("Customer", customerASchema);
module.exports = customerA;
