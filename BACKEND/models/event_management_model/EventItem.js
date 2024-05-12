const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({

    event_id: {
        type: String,
        required: true,
        
    },

    event_name :{
        type : String,
        required : true
    },

    item:{
        type: String,
        required: true
    },

    quantity :{
        type : String,
        required : true
    },

    price :{
        type : String,
        required : true
    },

    cost :{
        type : String,
        required : true
    }

})

const Item = mongoose.model("Item",itemSchema);

module.exports = Item;