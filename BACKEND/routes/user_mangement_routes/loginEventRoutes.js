// loginEventRoutes.js
const express = require('express');
const router = express.Router();
const LoginEvent = require("../../models/user_management_models/LoginEvent");

// Route handler for saving login events
router.post('/loginevent', async (req, res) => {
  try {
    // Assuming req.user contains information about the logged-in user, including their ID and user type
    const userId = req.user._id; // Assuming the user ID is stored in req.user._id
    const userType = req.user.userType; // Assuming the user type is stored in req.user.userType

    // Create a new login event
    const loginEvent = new LoginEvent({
      userId,
      userType
    });

    // Save the login event to the database
    await loginEvent.save();

    // Send success response
    res.status(200).send('Login event saved successfully');
  } catch (error) {
    // Handle errors
    console.error('Error saving login event:', error);
    res.status(500).send('Internal Server Error');
  }
});

async function logLoginEvent(userId, userType) {
    try {
      // Create a new login event
      const loginEvent = new LoginEvent({
        userId,
        userType
      });
  
      // Save the login event to the database
      await loginEvent.save();
    } catch (error) {
      // Handle errors
      console.error('Error saving login event:', error);
      throw error; // Re-throw the error to handle it in the calling route handler
    }
  }
  
  module.exports = {
    router,
    logLoginEvent // Export the logLoginEvent function
  };

