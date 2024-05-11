// Import necessary modules
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Staff = require("../../models/user_management_models/staff");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LoginEvent = require("../../models/user_management_models/LoginEvent");

// Validation middleware for staff registration
const staffValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('nic').notEmpty().withMessage('NIC is required'),
    body('contactNumber').notEmpty().withMessage('Contact Number is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().withMessage('Role is required')
];

// Route to create a new staff member
router.post("/addstaff", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    console.log("Validation errors:", errorMessages);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      nic,
      contactnumber,
      email,
      password,
      role
    } = req.body;

    const existingStaff = await Staff.findOne({ nic: nic });

    if (existingStaff) {
      return res
        .status(400)
        .json({ error: "Duplicate NIC. The NIC already exists." });
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStaff = new Staff({
      name,
      nic,
      contactnumber,
      email,
      password: hashedPassword,
      role
    });

    await newStaff.save();
    res.json("Staff Added");
  } catch (error) {
    console.error("Error saving staff:", error.message);

    if (error.response && error.response.data) {
      console.log("Error response from server:", error.response.data);

      const responseData = error.response.data;

      if (typeof responseData === "string") {
        // Check for the specific error message and display a custom alert
        if (responseData === "Duplicate NIC. The NIC already exists.") {
          return res
            .status(400)
            .json({ error: "The NIC already exists. Please use a different NIC." });
        } else {
          return res.status(500).json({ error: responseData }); // Display the error message directly
        }
      } else {
        return res
          .status(500)
          .json({ error: "An unexpected error occurred. Please try again." });
      }
    } else {
      console.log("Unexpected error structure:", error);
      return res
        .status(500)
        .json({ error: "An unexpected error occurred. Please try again." });
    }
  }
});

  router.route("/allstaff").get((req, res) => {
    Staff.find()
      .then((staffMembers) => {
        res.json(staffMembers);
      })
      .catch((err) => {
        console.error("Error retrieving staff members:", err);
        res.status(500).json({ error: "An unexpected error occurred. Please try again." });
      });
  });

  router.route("/staffprofile/:nic").get(async (req, res) => {
    try {
      const { nic } = req.params;
      const staffMember = await Staff.findOne({ nic });
  
      if (!staffMember) {
        return res.status(404).json({ status: 'Staff member not found' });
      }
  
      res.status(200).json({ status: 'Staff member fetched', staffMember });
    } catch (error) {
      console.error('Error fetching staff member:', error.message); // Add this log statement
      res.status(500).json({ status: 'Error fetching staff member', error: error.message });
    }
  });



  router.post("/stafflogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt with email:", email);

        // Find staff by email
        const staff = await Staff.findOne({ email });

        if (!staff) {
            console.log("Staff not found for email:", email);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        console.log("Staff found. Comparing passwords...");
        console.log("Provided password:", password);
        console.log("Stored hashed password:", staff.password);

        const isPasswordMatch = await bcrypt.compare(password, staff.password);

        if (!isPasswordMatch) {
            console.log("Password does not match for email:", email);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check if staff object contains the role field
        if (!staff.role) {
            console.log("Role not found for staff:", email);
            return res.status(500).json({ error: "Role not found for the staff" });
        }

        console.log("Password matched. Generating JWT token...");

        // Generate JWT token
        const token = jwt.sign({ email: staff.email, role: staff.role }, 'tharusha2001');

        console.log("Token generated successfully.");

        const decodedToken = jwt.decode(token);

        console.log("Decoded token payload:", decodedToken);

        // Log the login event
        const loginEvent = new LoginEvent({
            nic: staff.nic, // Assuming staff.nic contains the NIC of the staff member
            userType: staff.role // Assuming staff.role contains the user type of the staff member
        });

        await loginEvent.save();

        // Send the token in the response
        res.json({ token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "An unexpected error occurred. Please try again." });
    }
});

  function authenticateAdminToken(req, res, next) {
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
        
        // Check if the user is an admin
        if (req.user.role !== 'Admin') {
          return res.status(403).json({ error: 'Forbidden' });
        }
  
        next(); // Call the next middleware or route handler
      }
    });
  }
  router.get('/admin', authenticateAdminToken, (req, res) => {
    // This route handler will only be called if the token is valid
    // and the user is authenticated as an admin
    console.log('Role:', req.user.role); // Log the role
    res.json({ message: 'Welcome to the Admin Dashboard', role: req.user.role });
  });

  router.get('/getnic/:email', async (req, res) => {
    try {
      const { email } = req.params;
      // Find the staff member by email in the database
      const staff = await Staff.findOne({ email });
      if (!staff) {
        return res.status(404).json({ error: 'Staff member not found' });
      }
      // Return the NIC associated with the staff member's email
      res.json({ nic: staff.nic });
    } catch (error) {
      console.error('Error fetching NIC:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.route("/updatestaff/:nic").put(async (req, res) => {
    let userNIC = req.params.nic;
    const { name, email, contactNumber } = req.body; // Only extract name, email, and contact number from the request body
  
    const updateStaff = {
      name,
      email,
      contactNumber,
    };
  
    try {
      const staff = await Staff.findOneAndUpdate(
        { nic: userNIC },
        updateStaff,
        { new: true }
      );
  
      if (!staff) {
        return res.status(404).json({ status: "Staff not found" });
      }
  
      res.status(200).json({ status: "Staff Updated", staff: staff });
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ status: "Error with updating data", error: err.message });
    }
  });





  
  

module.exports = router;
