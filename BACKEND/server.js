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



app.listen(PORT, () => {
  console.log(`Server is up and running on port no: ${PORT}`);

});
