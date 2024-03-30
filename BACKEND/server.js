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

const PatientRouter = require("./routes/medical_data_manager_routes/patientsS.js");
app.use("/patients",PatientRouter);

const PressureRouter = require("./routes/medical_data_manager_routes/pressurerouteS.js");
app.use("/pressure",PressureRouter);

const DiabetesRouter = require("./routes/medical_data_manager_routes/diabetesrouteS.js");
app.use("/diabetes",DiabetesRouter) ;

const CholesterolRouter = require("./routes/medical_data_manager_routes/cholesterolroutesS.js");
app.use("/cholesterol",CholesterolRouter) ;


app.listen(PORT, () => {
  console.log(`Server is up and running on port no: ${PORT}`);

});
