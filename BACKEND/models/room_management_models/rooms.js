// rooms.js (Mongoose Schema)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const roomsSchema = new Schema({
    roomID: {
        type: String,
        required: true,
        unique: true
    },
    numOfBeds: {
        type: Number,
        required: true
    },
    bathroomType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedBeds: {
        type: Number,
        default: 0
    },
    availabilityStatus: {
        type: String,
        default: 'Available'
    },
    additionalItem: {
        type: String,
        required: true // Make additionalItem required
    }
});

const Rooms = mongoose.model("Room", roomsSchema);

module.exports = Rooms;
