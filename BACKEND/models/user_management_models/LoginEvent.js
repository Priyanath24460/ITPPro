const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for login events
const loginEventSchema = new Schema({
  nic: { type: String, required: true }, // NIC of the user
  userType: {
    type: String,
    enum: ['Elder', 'Guardian', 'Admin', 'Financial manager', 'meal manager', 'Inventory Manager', 'event coordinator', 'Medical Manager', 'staff manager'],
    required: true
  },
  timestamp: { type: Date, default: Date.now }
});

// Create a model for login events
const LoginEvent = mongoose.model('LoginEvent', loginEventSchema);

module.exports = LoginEvent;
