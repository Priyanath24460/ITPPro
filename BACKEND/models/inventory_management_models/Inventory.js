const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
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
    pricePerItem: {
        type: Number,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true,
        enum: ["MedSupp Enterprises"]
    },
    itemDate: {
        type: Date,
        default: Date.now 
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
