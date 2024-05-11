const router = require("express").Router();
const { body, validationResult } = require('express-validator');
let CustomerA = require("../../models/user_management_models/customerA");
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const LoginEvent = require("../../models/user_management_models/LoginEvent");

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
  body('age').notEmpty().withMessage('Age is required').isInt({ min: 50, max: 200 }).withMessage('Age must be a number between 50 and 200'),
  body('birthdate').notEmpty().withMessage('Birthdate is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('contactnumber').notEmpty().withMessage('Contact Number is required').isNumeric().withMessage('Contact Number must be a numeric value').isLength({ min: 10, max: 10 }).withMessage('Contact Number must be exactly 10 digits'),
  body('gname').notEmpty().withMessage('Name is required'),
  body('gnic').notEmpty().withMessage('NIC is required')
  .custom((value) => {
    const isValidLength = [12, 10].includes(value.length);
    const isNumeric = /^\d+$/.test(value);
    const endsWithV = /[Vv]$/.test(value);
    return (isValidLength && (isNumeric || endsWithV));
  })
  .withMessage('NIC must be either 12 digits or 9 digits followed by "V" or "v"'),
  body('gcontactnumber').notEmpty().withMessage('Contact Number is required').isNumeric().withMessage('Contact Number must be a numeric value').isLength({ min: 10, max: 10 }).withMessage('Contact Number must be exactly 10 digits'),
  body('gaddress').notEmpty().withMessage('Adddress is required'), 
  body('password').notEmpty().withMessage('Password is required'),
  body('confirmpassword').notEmpty().withMessage('Confirm Password is required')
];

router.post("/add", nicValidator, async (req, res) => {
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
      age,
      birthdate,
      gender,
      address,
      contactnumber,
      gname,
      gnic,
      gcontactnumber,
      gaddress,
      password,
      confirmpassword,
    } = req.body;

    // Set role to "elder" since this form is for elder registration
    const role = "elder";

    const existingCustomer = await CustomerA.findOne({ nic: nic });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ error: "Duplicate NIC. The NIC already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    const newCustomerA = new CustomerA({
      name,
      nic,
      age,
      birthdate,
      gender,
      address,
      contactnumber,
      gname,
      gnic,
      gcontactnumber,
      gaddress,
      password: hashedPassword, // Store the hashed password
      confirmpassword,
      role,
    });

    await newCustomerA.save();
    res.json("Customer Added");
  } catch (error) {
    console.error("Error saving customer:", error.message);

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
 router.route("/").get((req,res)=>{
   CustomerA.find().then((customerA)=>{
      res.json(customerA)
   }).catch((err)=>{
      console.log(err)
   })
 });

 router.route("/getpatientinnic/:nic").get((req,res)=>{
  let userNIC = req.params.nic;
  CustomerA.find({gnic:userNIC}).then((customerA)=>{
     res.json(customerA)
  }).catch((err)=>{
     console.log(err)
  })
});




 router.route("/update/:nic").put(async (req, res) => {
  let userNIC = req.params.nic;
  const {
    name,
    nic,
    age,
    birthdate,
    gender,
    address,
    contactnumber,
    gname,
    gnic,
    gcontactnumber,
    gaddress,
    password,
  } = req.body;

  const updateCustomerA = {
    name,
    nic,
    age,
    birthdate,
    gender,
    address,
    contactnumber,
    gname,
    gnic,
    gcontactnumber,
    gaddress,
    password,
  };

  try {
    const customer = await CustomerA.findOneAndUpdate(
      { nic: userNIC },
      updateCustomerA,
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ status: "User not found" });
    }

    res.status(200).json({ status: "User Updated", customer: customer });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ status: "Error with updating data", error: err.message });
  }
});



router.route("/delete/:nic").delete(async(req,res)=>{
  let userNic = req.params.nic;

  await CustomerA.findOneAndDelete({ nic: userNic }).then((deletedUser)=>{
     if (deletedUser) {
        res.status(200).send({ status: "User deleted", deletedUser });
     } else {
        res.status(404).send({ status: "User not found" });
     }
  }).catch((err)=>{
     console.log(err.message);
     res.status(500).send({ status: "Error with delete user", error: err.message });
  });
});


router.route("/get/:nic").get(async (req, res) => {
  let userNIC = req.params.nic; // Corrected parameter name to match the route
  try {
    const customer = await CustomerA.findOne({ nic: userNIC }); // Use findOne with the correct field

    if (!customer) {
      return res.status(404).json({ status: "User not found" });
    }

    res.status(200).json({ status: "User Fetched", customer: customer });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Error with getting user", error: error.message });
  }
});

router.route("/elderprofile/:nic").get(authenticateToken,async (req, res) => {
  let userNIC = req.params.nic; // Corrected parameter name to match the route
  try {
    const user = await CustomerA.findOne({ nic: userNIC }); // Use findOne with the correct field

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    res.status(200).json({ status: "User Fetched", user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Error with getting user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { nic, password } = req.body;

    console.log("Login attempt with NIC:", nic);

    // Find user by NIC
    const user = await CustomerA.findOne({ nic });

    if (!user) {
      console.log("User not found for NIC:", nic);
      return res.status(401).json({ error: "Invalid NIC or password" });
    }

    // Compare passwords
    console.log("User found. Comparing passwords...");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log("Password does not match for NIC:", nic);
      return res.status(401).json({ error: "Invalid NIC or password" });
    }

    // Check if user object contains the role field
    if (!user.role) {
      console.log("Role not found for user:", nic);
      return res.status(500).json({ error: "Role not found for the user" });
    }

    console.log("Password matched. Generating JWT token...");

    // Generate JWT token
    const token = jwt.sign({ nic: user.nic, role: user.role }, 'tharusha2001');

    console.log("Token generated successfully.");

    // Create a new login event
    const loginEvent = new LoginEvent({
      nic: user.nic,
      userType: 'Elder' // Assuming the user type is 'elder'
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





 module.exports = router;