const express = require("express");
const path = require("path");
const router = express.Router();
const Pressure = require("../../models/medical_data_manager_models/pressuredataS");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to add pressure data with PDF
router.route("/addpd").post(upload.single("pdfFile"), (req, res) => {
  const nic = req.body.nic;
  const name = req.body.name;
  const high = req.body.high;
  const low = req.body.low;
  const date = req.body.date;

  const pdfFile = req.file;

  const newPressure = new Pressure({
    nic,
    name,
    high,
    low,
    date,
    pdf: {
      data: pdfFile.buffer,
      contentType: pdfFile.mimetype,
    },
  });

  
    
    newPressure.save().then(() => {
      res.json("new pressure data added");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error saving pressure data" });
    });
});

// Route to get pressure data by NIC
router.route("/getonepd/:nic").get(async (req, res) => {
  try {
    const usernic = req.params.nic;
    const pressure = await Pressure.find({ nic: usernic }).select("-pdf.data");

    if (pressure) {
      res.status(200).send({ status: "pressure fetched", data: pressure });
    } else {
      res.status(404).send({ status: "pressure not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with get pressure", error: err.message });
  }
});

// Add a new route to fetch the PDF data
router.route("/viewpdf/:id").get(async (req, res) => {
  try {
    const PressureID = req.params.id;
    const pressureEntry = await Pressure.findById(PressureID );

    if (pressureEntry && pressureEntry.pdf && pressureEntry.pdf.data) {
      res.setHeader('Content-Type', pressureEntry.pdf.contentType);
      res.send(pressureEntry.pdf.data);
    } else {
      res.status(404).send({ status: "PDF not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with view PDF", error: err.message });
  }
});


// Update pressure data

router.route("/update/:id").put(upload.single("pdfFile"), async (req, res) => {
  try {
    const PressureID = req.params.id;
    const { high,low, date } = req.body;
    const pdfFile = req.file;

    // Find the diabetes entry by ID
    const pressureEntry = await Pressure.findById(PressureID);

    if (!pressureEntry) {
      return res.status(404).send({ status: "Diabetes data not found" });
    }

    // Update the level and date
    pressureEntry.high = high
    pressureEntry.low = low
    pressureEntry.date = date;

    // Update the PDF data if a new file is provided
    if (pdfFile) {
      pressureEntry.pdf.data = pdfFile.buffer;
      pressureEntry.pdf.contentType = pdfFile.mimetype;
    }

    // Save the updated diabetes entry
    await pressureEntry.save();

    res.status(200).send({ status: "pressure data updated", data: pressureEntry });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: "Error updating pressure data", error: err.message });
  }
});




module.exports = router;
