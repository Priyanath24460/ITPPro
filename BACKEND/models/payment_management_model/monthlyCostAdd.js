const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddCostSchema = new Schema({

    monthlyCost:{
        type: String,
        required : true
    }
})

const monthlyCostDetails = mongoose.model("monthlyCostAdd",AddCostSchema);
module.exports = monthlyCostDetails;