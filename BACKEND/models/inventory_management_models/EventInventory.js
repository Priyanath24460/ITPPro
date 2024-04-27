const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventInventorySchema = new Schema({
    itemCode: {
        type: String,
        required: true,
        unique: true
    },
    itemName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ["New", "Very Good", "Good", "Fair", "Poor", "Not Working"],
        required: true
    }
});

const EventInventory = mongoose.model("EventInventory", eventInventorySchema);

module.exports = EventInventory;
