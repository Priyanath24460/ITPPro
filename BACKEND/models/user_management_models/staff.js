const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    contactnumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        
    }
});

StaffSchema.methods.comparePassword = async function(candidatePassword) {
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

const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;
