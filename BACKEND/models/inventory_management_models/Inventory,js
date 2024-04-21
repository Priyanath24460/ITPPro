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
        required: true
    },
    expireDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                // Ensure the expiration date is in the future
                return value > new Date();
            },
            message: "Expiration date must be in the future"
        }
    }
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
