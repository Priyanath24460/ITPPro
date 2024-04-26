const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payRollSchema = new Schema({
    nic: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    otHours: {
        type: Number,
        required: true, // Add otHours field and mark it as required if needed
    },
});

const payRoll = mongoose.model('payRoll', payRollSchema);

module.exports = payRoll;
