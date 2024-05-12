const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const nodemailer = require("nodemailer");


const PORT = process.env.PORT || 8070;

app.use(cors());

app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection success!");
});


//medical management

const PatientRouter = require("./routes/medical_data_manager_routes/patientsS.js");
app.use("/patients",PatientRouter);

const PressureRouter = require("./routes/medical_data_manager_routes/pressurerouteS.js");
app.use("/pressure",PressureRouter);

const DiabetesRouter = require("./routes/medical_data_manager_routes/diabetesrouteS.js");
app.use("/diabetes",DiabetesRouter) ;

const CholesterolRouter = require("./routes/medical_data_manager_routes/cholesterolroutesS.js");
app.use("/cholesterol",CholesterolRouter) ;

const PressureMedicineRouter = require("./routes/medical_data_manager_routes/pressureMedicineRoutes.js");
app.use("/pressureMedicine",PressureMedicineRouter);

const DiabetesMedicineRouter = require("./routes/medical_data_manager_routes/diabetesMedicineRoutes.js");
app.use("/diabetesMedicine",DiabetesMedicineRouter);

const CholesterolMedicineRouter = require("./routes/medical_data_manager_routes/cholesterolMedicineRoutes.js");
app.use("/cholesterolMedicine",CholesterolMedicineRouter);



// user management


const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your client's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const customerARouter = require("./routes/user_mangement_routes/customerARoutes.js");
app.use("/customerA", customerARouter);

const guardianRouter = require("./routes/user_mangement_routes/GuardianRoutes.js");
app.use("/guardian", guardianRouter);

const staffRouter = require("./routes/user_mangement_routes/StaffRoutes.js");
app.use("/staff", staffRouter);

const loginEventRouter = require("./routes/user_mangement_routes/loginEventRoutes.js");
app.use("/LoginEvent", loginEventRouter);

const userpdfRouter = require("./routes/user_mangement_routes/userpdfRoutes.js")
app.use("/userpdf", userpdfRouter);


// room management


const roomsRouter = require("./routes/room_management_routes/rooms.js");
app.use("/rooms",roomsRouter);

const residentsRouter = require("./routes/room_management_routes/residents.js");
app.use("/residents",residentsRouter);



// staff management

const elderRouter = require("./routes/staff_management_routes/payinfos.js");
app.use("/payInfo", elderRouter);

const payRollRouter = require("./routes/staff_management_routes/payRolls.js");
app.use("/PayRoll", payRollRouter);

const staffmanager = require("./routes/staff_management_routes/staffroute.js");
app.use("/staffmanager", staffmanager);


//payment Management
// card details
const paymentRouter = require("./routes/payment_management_route/paymentDetails.js");
app.use("/paymentDetails",paymentRouter);
// payment details
const paymentHolder = require("./routes/payment_management_route/paymentHolderDetails.js");
app.use("/paymentHolderDetails",paymentHolder);

// Monthly cost details
const monthlyCost = require("./routes/payment_management_route/monthlyCostAddDetails.js");
app.use("/monthlyCostAddDetails",monthlyCost);



// inventry management Routes----------------------------------------------------------------------------------------------------
// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "chamindudenuwan246@gmail.com",
    pass: "ypvq blsc czyp uwmd",
  },
});

// Routes
const inventoryRouter = require("./routes/inventory_management_routes/Inventories.js");
const eventInventoryRouter = require("./routes/inventory_management_routes/EventInventories.js");
const IhistoryRouter = require("./routes/inventory_management_routes/Ihistories.js");

app.use("/history", IhistoryRouter); 
app.use("/inventory", inventoryRouter); 
app.use("/eventinventory", eventInventoryRouter);

// Endpoint to send email
app.post("/send-email", async (req, res) => {
  const { recipientEmail, itemCode } = req.body;

  try {
    await transporter.sendMail({
      from: '"Chamindu Denuwan" <chamindudenuwan246@gmail.com>',
      to: recipientEmail,
      subject: "Item Out of Stock Notification",
      html: `<p>The item ${itemCode} is now out of stock.</p>`,
    });

    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


app.listen(PORT, () => {
  console.log(`Server is up and running on port no: ${PORT}`);

});
