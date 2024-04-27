const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


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


// inventry management Routes
const inventoryRouter = require("./routes/inventory_management_routes/Inventories.js");
const eventInventoryRouter = require("./routes/inventory_management_routes/EventInventories.js");

app.use("/inventory", inventoryRouter); // Use "/inventory" as the base path
app.use("/eventinventory", eventInventoryRouter); // Use "/eventinventory" as the base path for event inventory


app.listen(PORT, () => {
  console.log(`Server is up and running on port no: ${PORT}`);

});
