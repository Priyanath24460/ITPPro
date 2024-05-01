// Models/History.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema(
  {
    itemCode: {
      type: String,
      required: true,
    },
    operation: {
      type: String,
      enum: ["add", "remove"],
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    pricePerItem: {
      type: Number,
      required: true,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const History = mongoose.model("history", historySchema);

module.exports = History;
