const router = require("express").Router();
const { body, validationResult } = require('express-validator');
let Guardian = require("../../models/user_management_models/guardian");
const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginEvent = require("../../models/user_management_models/LoginEvent");
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

const nicValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('nic').notEmpty().withMessage('NIC is required')
    .custom((value) => {
      const isValidLength = [12, 10].includes(value.length);
      const isNumeric = /^\d+$/.test(value);
      const endsWithV = /[Vv]$/.test(value);
      return (isValidLength && (isNumeric || endsWithV));
    })
    .withMessage('NIC must be either 12 digits or 9 digits followed by "V" or "v"'),
  body('contactnumber').notEmpty().withMessage('Contact Number is required').isNumeric().withMessage('Contact Number must be a numeric value').isLength({ min: 10, max: 10 }).withMessage('Contact Number must be exactly 10 digits'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'), // Add email validation
  body('password').notEmpty().withMessage('Password is required'),
];

router.post("/addguardian", nicValidator, async (req, res) => {
  try {
    // Log the received request data
    console.log("Received request data:", req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      console.log("Validation errors:", errorMessages);
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      nic,
      contactnumber,
      email,
      password,
    } = req.body;

    // Set role to "guardian" since this form is for guardian registration
    const role = "guardian";

    // Check if email already exists
    const existingGuardianByEmail = await Guardian.findOne({ email });
    if (existingGuardianByEmail) {
      return res.status(400).json({ error: "Email already registered. Please use a different email." });
    }

    // Check if NIC already exists
    const existingGuardianByNIC = await Guardian.findOne({ nic });
    if (existingGuardianByNIC) {
      return res.status(400).json({ error: "Duplicate NIC. The NIC already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    const newGuardian = new Guardian({
      name,
      nic,
      contactnumber,
      email,
      password: hashedPassword, // Store the hashed password
      role,
    });

    await newGuardian.save();
    res.json("Guardian Added");
  } catch (error) {
    console.error("Error saving guardian:", error.message);

    if (error.response && error.response.data) {
      console.log("Error response from server:", error.response.data);

      const responseData = error.response.data;

      if (typeof responseData === "string") {
        // Check for the specific error message and display a custom alert
        if (
          responseData === "Duplicate NIC. The NIC already exists."
        ) {
          return res.status(400).json({ error: "The NIC already exists. Please use a different NIC." });
        } else {
          return res.status(500).json({ error: responseData }); // Display the error message directly
        }
      } else {
        return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
      }
    } else {
      console.log("Unexpected error structure:", error);
      return res.status(500).json({ error: "An unexpected error occurred. Please try again." });
    }
  }
});

  

router.get("/guardianprofile/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the guardian profile based on the provided NIC
    const guardian = await Guardian.findOne({ email });

    if (!guardian) {
      return res.status(404).json({ error: "Guardian not found." });
    }

    // Send the guardian profile data as the response
    res.json({ user: guardian });
  } catch (error) {
    console.error("Error fetching guardian profile:", error.message);
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

router.post("/guardianlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt with email:", email);

    // Find guardian by email
    const guardian = await Guardian.findOne({ email });

    if (!guardian) {
      console.log("Guardian not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    console.log("Guardian found. Comparing passwords...");

    const isPasswordMatch = await bcrypt.compare(password, guardian.password);

    if (!isPasswordMatch) {
      console.log("Password does not match for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if guardian object contains the role field
    if (!guardian.role) {
      console.log("Role not found for guardian:", email);
      return res.status(500).json({ error: "Role not found for the guardian" });
    }

    console.log("Password matched. Generating JWT token...");

    // Generate JWT token
    const token = jwt.sign({ email: guardian.email, role: guardian.role }, 'tharusha2001');

    console.log("Token generated successfully.");

    // Create a new login event
    const loginEvent = new LoginEvent({
      nic: guardian.nic,
      userType: 'Guardian' // Assuming the user type is 'guardian'
    });

    // Save the login event to the database
    await loginEvent.save();

    // Send the token in the response
    res.json({ token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

  function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Verify token format
    const tokenRegex = /^Bearer\s/;
    if (!tokenRegex.test(token)) {
      return res.status(401).json({ error: 'Invalid token format' });
    }
  
    // Extract token value
    const extractedToken = token.replace(tokenRegex, '');
  
    // Validate token
    jwt.verify(extractedToken, 'tharusha2001', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      } else {
        // Token is valid, proceed with the request
        req.user = decoded; // Attach decoded user information to the request object
        next(); // Call the next middleware or route handler
      }
    });
  }
  
  router.put("/updateguardian/:nic", async (req, res) => {
    try {
      const guardianNIC = req.params.nic;
      const updatedDetails = req.body;
  
      // Exclude password field from update
      delete updatedDetails.password;
  
      // Update guardian details based on NIC
      const updatedGuardian = await Guardian.findOneAndUpdate(
        { nic: guardianNIC },
        updatedDetails,
        { new: true }
      );
  
      if (!updatedGuardian) {
        return res.status(404).json({ error: "Guardian not found" });
      }
  
      // Return updated guardian details
      res.json(updatedGuardian);
    } catch (error) {
      console.error("Error updating guardian details:", error.message);
      res.status(500).json({ error: "An unexpected error occurred. Please try again." });
    }
  });

  router.delete("/deleteguardian/:nic", async (req, res) => {
    try {
      const guardianNIC = req.params.nic;
  
      // Find and delete the guardian by NIC
      const deletedGuardian = await Guardian.findOneAndDelete({ nic: guardianNIC });
  
      if (!deletedGuardian) {
        return res.status(404).json({ error: "Guardian not found" });
      }
  
      // Return success message
      res.json({ message: "Guardian profile deleted successfully" });
    } catch (error) {
      console.error("Error deleting guardian profile:", error.message);
      res.status(500).json({ error: "An unexpected error occurred. Please try again." });
    }
  });

  router.get('/allguardians', async (req, res) => {
    try {
      // Query the database to retrieve all guardians with only name and nic fields
      const guardians = await Guardian.find({}, 'name nic');
      // Send the guardians data as JSON response
      res.json(guardians);
    } catch (error) {
      // If there's an error, send a 500 status code with an error message
      console.error('Error fetching guardians:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lh20011213@gmail.com',
      pass: 'wwxsprtymxlztmst'
    }
  });
  
  
  let generatedOTP; // Define a variable to store the generated OTP

router.post('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  // Generate a new random OTP each time the route is called
  generatedOTP = randomstring.generate({
    length: 6, // Length of the OTP
    charset: 'numeric' // Use numeric characters for the OTP
  });

  // Define mail options with OTP included in the text
  const mailOptions = {
    from: 'itpmodule2001@gmail.com',
    to: email,
    subject: 'Password Reset OTP', // Subject of the email
    text: `Your OTP for password reset is: ${generatedOTP}` // Include the OTP in the email text
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ success: false, message: 'Failed to send password reset email.' });
  }
});

router.post('/verifyotp', async (req, res) => {
  const { enteredOTP } = req.body; // Get the OTP entered by the user
  const storedOTP = generatedOTP; // Retrieve the stored OTP from the OTP generation route

  try {
    // Compare the entered OTP with the stored OTP
    if (enteredOTP === storedOTP) {
      // If the OTPs match, consider it verified
      res.status(200).json({ success: true, message: 'OTP verified successfully.' });
    } else {
      // If the OTPs don't match, return an error
      res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
  }
});



router.post('/updateguardianpassword/:email', async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;

  try {
    // Find the guardian by email
    const guardian = await Guardian.findOne({ email });

    if (!guardian) {
      return res.status(404).json({ error: 'Guardian not found.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update guardian's password with the hashed password
    guardian.password = hashedPassword;
    await guardian.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Failed to update password. Please try again.' });
  }
});


  module.exports = router;