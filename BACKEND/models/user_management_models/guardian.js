const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const GuardianSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    nic : {
        type : String,
        required: true,
        unique: true
    },
    contactnumber : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password :{ 
        type : String,
        required : true
    },
    role: {
        type: String,
        default: 'guardian' // Set the default role to 'guardian'
    }
});


GuardianSchema.methods.comparePassword = async function(candidatePassword) {
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

const Guardian = mongoose.model("Guardian", GuardianSchema);
module.exports = Guardian;
