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

router.get('/loginevents', async (req, res) => {
  try {
    // Extract start and end timestamps from query parameters
    const { startTime, endTime } = req.query;

    // Convert timestamps to Date objects
    const startDate = new Date(parseInt(startTime));
    const endDate = new Date(parseInt(endTime));

    // Query MongoDB collection for login events within the specified time range
    const loginEvents = await LoginEvent.find({
      timestamp: { $gte: startDate, $lte: endDate }
    });

    // Calculate the count of login events for each user role
    const loginCounts = {
      elder: 0,
      guardian: 0,
      staff: 0
    };

    loginEvents.forEach(event => {
      switch (event.userType) {
        case 'Elder':
          loginCounts.elder++;
          break;
        case 'Guardian':
          loginCounts.guardian++;
          break;
        case 'Admin':
        case 'Financial Manager':
        case 'Meal Manager':
        case 'Inventory Manager':
        case 'Event Coordinator':
        case 'Medical Manager':
        case 'Staff Manager':
          loginCounts.staff++;
          break;
        default:
          // Do nothing for unknown user types
          break;
      }
    });

    // Return login counts data in JSON format
    res.json(loginCounts);
  } catch (error) {
    // Handle errors
    console.error('Error fetching login events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getloginevents', async (req, res) => {
  try {
    // Fetch all login events from the database
    const loginEvents = await LoginEvent.find();

    // Count login events by user type
    const loginEventsData = loginEvents.reduce((acc, loginEvent) => {
      acc[loginEvent.userType] = (acc[loginEvent.userType] || 0) + 1;
      return acc;
    }, {});

    // Send the login events data in JSON format
    res.json(loginEventsData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching login events:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router; // Export the router only
